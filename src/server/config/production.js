'use strict';

const path = require('path');
const root = path.join(__dirname, '../../');

const staticResources = path.join(root, './client');

// Production specific configuration
// =================================
module.exports = {
  //views: root + '/server/views-dist/',
  root,
  static: staticResources,
  host: process.env.HOST || 'localhost',
  baseUrl: 'https://localhost',

  //views: path.normalize(__dirname + '/views/'),
  //uploadDir: path.normalize(root + '/../upload'),

  logger: {
    app: 'app',
    level: 'debug'
  },
  
  email: {
    api: 'https://localhost/api/v1/auth/activate'
  },

  mongo: {
    uri: 'mongodb://localhost:27017/generator-mvp'
  }
};
