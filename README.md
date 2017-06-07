
## Required
* MongoDB 3+
* Node 4.2+

## Install
```
npm install
```

## Dev
```
mongod
npm run server
npm run client
```

## Available pages
```
http://localhost:3000/dashboard
http://localhost:3000/auth
```

## Build
```
npm run build        # client + server
npm run build-server # only server
npm run build-client # only client
```

## Deploy
```
./deploy-server.sh
```

Script keys:
```
  -i *file_path*      # set ssh key         (optional)
  -s                  # set cygwin mode     (only for windows, set if you use cygwin)
  -ppk *file_path*    # set ppk file        (only for windows, required if you use git bash)
```

> Note for windows users. If you use git bash for run a deploy script, then you need to install C:\pscp.exe file.

Example (*nix)
```
    ./deploy-server.sh
```

Example (windows + git bash)
```
    ./deploy-server.sh -ppk ~/.ssh/public.ppk -i ~/.ssh/public
```

Example (windows + cygwin)
```
    ./deploy-server.sh -s -i ~/.ssh/RonanPublic
```