import React from 'react';
import {Router, Route, IndexRoute, browserHistory, Redirect} from 'react-router';
import {requireJWT} from '../utils/auth.utils';

import Root from '../containers/root';
import Auth from '../containers/auth';
import Dashboard from '../containers/dashboard';
import HomeWrap from '../containers/home';
import NotFound from '../containers/not-found';

export default (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Root} onEnter={requireJWT}>
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/home" component={HomeWrap} />
      <Route path="/*" component={NotFound} />
      <IndexRoute component={Dashboard} />
    </Route>
  </Router>
);
