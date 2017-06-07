import {
  newNotesDataAfterDeleteNote,
  noteInCorrection,
  updateNote
} from '../../utils/notes.parse-data.js';
import {
  START_DATA_NOTES_LOADING,
  DATA_NOTES_SUCCESS,
  DATA_NOTES_FAIL,
  CREATE_NOTE,
  CREATE_NOTE_FAIL,
  DELETE_NOTE,
  DELETE_NOTE_FAIL,
  START_CORRECTION_NOTE,
  CANCEL_CORRECTION_NOTE,
  SAVE_CORRECTED_NOTE,
  SAVE_CORRECTED_NOTE_FAIL
} from './notes.actions';

const initialState = {
  loadingNotes: true,
  dataNotes: [],
  noteInCorrectionProcess: {
    process: false,
    note: {}
  },
  err: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    case START_DATA_NOTES_LOADING: {
      return Object.assign({}, state, {
        loadingNotes: true
      });
    }

    case DATA_NOTES_SUCCESS: {
      return Object.assign({}, state, {
        loadingNotes: false,
        dataNotes: action.dataNotes,
        err: null
      });
    }

    case DATA_NOTES_FAIL: {
      return Object.assign({}, state, {
        loadingNotes: false,
        err: action.err
      });
    }

    case CREATE_NOTE: {
      return Object.assign({}, state, {
        dataNotes: [...state.dataNotes, action.newNote],
        err: null
      });
    }

    case CREATE_NOTE_FAIL: {
      return Object.assign({}, state, {
        err: action.err
      });
    }

    case DELETE_NOTE: {
      return Object.assign({}, state, {
        dataNotes: newNotesDataAfterDeleteNote(state.dataNotes, action.body._id),
        err: null
      });
    }

    case DELETE_NOTE_FAIL: {
      return Object.assign({}, state, {
        err: action.err
      });
    }

    case START_CORRECTION_NOTE: {
      return Object.assign({}, state, {
        noteInCorrectionProcess: Object.assign({}, state.noteInCorrectionProcess, {
          process: true,
          note: noteInCorrection(state.dataNotes, action.body._id)
        })
      });
    }

    case CANCEL_CORRECTION_NOTE: {
      return Object.assign({}, state, {
        noteInCorrectionProcess: Object.assign({}, state.noteInCorrectionProcess, {
          process: false,
          note: {}
        })
      });
    }

    case SAVE_CORRECTED_NOTE: {
      console.log(action.body);
      return Object.assign({}, state, {
        dataNotes: updateNote(state.dataNotes, action.body),
        noteInCorrectionProcess: Object.assign({}, state.noteInCorrectionProcess, {
          process: false,
          note: {}
        }),
        err: null
      });
    }

    case SAVE_CORRECTED_NOTE_FAIL: {
      return Object.assign({}, state, {
        err: action.err
      });
    }

    default: {
      return state;
    }
  }
}
