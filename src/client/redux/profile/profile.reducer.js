import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  LOGOUT_SUCCESS,
  // LOGOUT_FAIL,
} from './profile.actions.js';

const initalState = {
  isLoaded: false,
  email: '',
  err: null,
  logout: false
};

export default (state = initalState, action) => {
  switch (action.type) {

  case FETCH_PROFILE_SUCCESS:
    return Object.assign({}, state, {
      email: action.profile.email,
      isLoaded: true
    });

  case FETCH_PROFILE_FAIL:
    return Object.assign({}, state, {err: action.err, logout: true});

    // case LOGOUT_FAIL:
    //   return Object.assign({}, state, {err: action.err});

  case LOGOUT_SUCCESS:
    return Object.assign({}, state, Object.assign({}, initalState, {logout: true}));

  default:
    return state;
  }
};
