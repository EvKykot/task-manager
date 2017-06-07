'use strict';

const TASKMANAGER = require('./task-manager');

module.exports = function(app) {
  app.get('/', TASKMANAGER);
  app.get('/auth', TASKMANAGER);
  app.get('/auth/*', TASKMANAGER);
  app.get('/dashboard', TASKMANAGER);
  app.get('/dashboard/*', TASKMANAGER);
  app.get('/home', TASKMANAGER);
  app.get('/home/*', TASKMANAGER);
};
