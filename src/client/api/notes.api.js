import {createApi} from '../../client/libs/rapi';

export const NotesApi = createApi({
  getNotes: {
    url: '/api/v1/notes',
    method: 'get'
  },
  createNote: {
    url: '/api/v1/notes',
    method: 'post'
  },
  deleteNote: {
    url: '/api/v1/notes',
    method: 'delete'
  },
  saveCorrectedNote: {
    url: '/api/v1/notes',
    method: 'put'
  }
});

export default NotesApi;
