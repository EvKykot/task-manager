#!/bin/bash

# colors for output
RED='\033[0;31m'
NC='\033[0m' # No Color
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'

# Check current branch is production
#current_branch=$(git symbolic-ref HEAD 2>/dev/null)
#if [ ${current_branch} != "refs/heads/production" ];
#then
#echo -e "\n\n\n***********************************************************************\n\n"
#echo -e "${RED}Your current branch is not production.${NC}\n"
#echo -e "Please checkout to production branch for deploy.\n\n\$ git checkout production"
#echo -e "\n\n***********************************************************************\n\n\n\n"
#exit 1;
#fi

REMOTE_USER='root' # 'ubuntu' for Amazon instances
REMOTE_HOST='42.42.42.42'
REMOTE_FOLDER='/srv/generator-mvp'
SSH_PORT=22

IS_CYGWIN=false
OS=$(uname -s)
if [ \( ${OS} == "Linux" \) -o \( ${OS} == "Darwin" \) ];
then
    echo -e "${CYAN}${OS} operation system used${NC}"
else
    OS="Windows"
    echo -e "${CYAN}${OS} operation system used${NC}"
fi


while test $# -gt 0; do
    case "$1" in
        -i)
            shift
            key_file="-i $1"
            ;;
        -s)
            IS_CYGWIN=true
            ;;
        -ppk)
            shift
            key_file_ppk="-i $1"
            ;;
        *)
            break
            ;;
    esac
    shift
done


# check for file pscp.exe existing
if [ "$IS_CYGWIN" == false ] && [ ${OS} == "Windows" ]; then
    if [ ! -f C:\\pscp.exe ]; then
        echo -e "\n${RED}File C:\\pscp.exe not found on your machine${NC}"
        exit 1;
    fi
fi


# need for configure dashboard
export NODE_ENV=production

# copy files to servers
# choose OS for command to use
if [ "$IS_CYGWIN" == false ] && [ ${OS} == "Windows" ]; then
    eval "C://pscp.exe -v -r -P ${SSH_PORT} ${key_file_ppk} build/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_FOLDER}"
    echo -e "\n${CYAN}Files copied to server successfully${NC}"
else
    rsync -p --chmod=+rx -v -r -e "ssh -p $SSH_PORT $key_file" build/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_FOLDER
    echo -e "\n${CYAN}Files copied to server successfully${NC}"
fi

# run npm install on node server
echo -e "\n${GREEN}Npm install running...\n${NC}"
eval "ssh ${key_file} ${REMOTE_USER}@${REMOTE_HOST} -p${SSH_PORT} 'cd /srv/generator-mvp/server && npm install --production'"
echo -e "\n${GREEN}Npm installed successfully${NC}"

# restart PM2 on server
echo -e "\n${GREEN}PM2 restart running...\n${CYAN}"
eval "ssh ${key_file} ${REMOTE_USER}@${REMOTE_HOST} -p${SSH_PORT} 'pm2 restart all'"
echo -e "\n${GREEN}PM2 restarted successfully${NC}"

# return back enviroment
export NODE_ENV=development

# git log --pretty=format:'%h %an(%ae) - %B' --abbrev-commit --date=short -1 > version-release.txt
# echo -e "\n${GREEN}Deployed commit:${YELLOW}"
# cat version-release.txt
# echo -e "${NC}";