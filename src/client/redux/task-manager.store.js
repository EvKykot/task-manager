import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {syncHistory, routeReducer} from 'redux-simple-router';
import { browserHistory } from 'react-router';

import profile from './profile/profile.reducer';
import notes from './notes/notes.reducer';

const reducers = combineReducers({
  notes,
  profile,
  routing: routeReducer
});

const middleware = [thunk, syncHistory(browserHistory)];
const createStoreFn = applyMiddleware(...middleware)(createStore);
const store = createStoreFn(reducers);

export default store;
