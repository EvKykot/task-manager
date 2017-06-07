import {createApi} from '../../client/libs/rapi';

const AuthApi = createApi({

  login: {
    url: '/api/v1/auth/login',
    method: 'post'
  },

  signup: {
    url: '/api/v1/auth/signup',
    method: 'post'
  }

});

export default AuthApi;
