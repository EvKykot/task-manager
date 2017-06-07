'use strict';

const config = require('../config');
const logger = require('../utils/logger').create('MDB');
const MDBConnection = require('../libs/mdb-connection');
const MDB = new MDBConnection(logger);

MDB.connect({
  uri: config.mongo.uri,
  options: config.mongo.options
});

module.exports = MDB;
