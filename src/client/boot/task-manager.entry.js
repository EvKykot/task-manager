import 'core-js';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/task-manager.store.js';
import routes from './task-manager.router.jsx';

injectTapEventPlugin();

const app = (
  <Provider store={store}>
    {routes}
  </Provider>
);

ReactDom.render(app, document.getElementById('root'));
