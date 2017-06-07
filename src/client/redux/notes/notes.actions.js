import NotesApi from '../../api/notes.api';
import {createAsyncAction} from '../../../client/libs/redux-helpers';

export const START_DATA_NOTES_LOADING = 'START_DATA_TASKS_LOADING';
export const DATA_NOTES_SUCCESS = 'DATA_TASKS_SUCCESS';
export const DATA_NOTES_FAIL = 'DATA_TASKS_FAIL';

export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTE_FAIL = 'CREATE_NOTE_FAIL';

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';

export const START_CORRECTION_NOTE = 'START_CORRECTION_NOTE';
export const CANCEL_CORRECTION_NOTE = 'CANCEL_CORRECTION_NOTE';

export const SAVE_CORRECTED_NOTE = 'SAVE_CORRECTED_NOTE';
export const SAVE_CORRECTED_NOTE_FAIL = 'SAVE_CORRECTED_NOTE_FAIL';

export const startNotesLoading = () => ({type: START_DATA_NOTES_LOADING});

export const getNotesData = createAsyncAction({
  fn: NotesApi.getNotes,
  success: (body) => {
    return ({type: DATA_NOTES_SUCCESS, dataNotes: body})
  },
  error: (err) => ({type: DATA_NOTES_FAIL, err})
});

export const createNote = createAsyncAction({
  fn: NotesApi.createNote,
  success: (body) => {
    return ({type: CREATE_NOTE, newNote: body})
  },
  error: (err) => ({type: CREATE_NOTE_FAIL, err})
});

export const deleteNote = createAsyncAction({
  fn: NotesApi.deleteNote,
  success: (body) => {
    return ({type: DELETE_NOTE, body})
  },
  error: (err) => ({type: DELETE_NOTE_FAIL, err})
});

export const startCorrectNote = (body) => ({type: START_CORRECTION_NOTE, body});

export const cancelCorrectNote = () => ({type: CANCEL_CORRECTION_NOTE});

export const saveCorrectedNote = createAsyncAction({
  fn: NotesApi.saveCorrectedNote,
  success: (body) => {
    return ({type: SAVE_CORRECTED_NOTE, body})
  },
  error: (err) => ({type: SAVE_CORRECTED_NOTE_FAIL, err})
});
