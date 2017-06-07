'use strict';

const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

  app.enable('trust proxy');

  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());

};
