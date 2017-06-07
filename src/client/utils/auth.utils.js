import {setJWTToken} from '../libs/rapi';

const JWT_KEY = 'jwt';

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length == 2) return parts.pop().split(';').shift();
};

export const hasCookie = (name) => {
  const pairs = document.cookie.split(';');

  for (let i = 0; i < pairs.length; ++i) {
    if (pairs[i].split('=')[0].trim() === name) return true;
  }
  return false;
};

export const checkAndSetJWT = () => {
  const jwt = getCookie('jwt');
  if (!jwt) return false;

  setJWTToken(jwt);
  return true;
};

export const resetToken = () => {
  document.cookie = `${JWT_KEY}=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  setJWTToken(null);
};

export const requireJWT = (state, replace) => {
  if (!checkAndSetJWT() && state.location.pathname !== '/auth') {
    replace('/auth');
  }
};
