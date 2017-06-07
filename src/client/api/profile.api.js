import {createApi} from '../../client/libs/rapi';

const ProfileApi = createApi({

  fetch: {
    url: '/api/v1/profile',
    method: 'get'
  },

});

export default ProfileApi;


