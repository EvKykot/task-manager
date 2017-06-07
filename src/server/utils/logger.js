'use strict';

const _ = require('lodash');
const bunyan = require('bunyan');
const config = require('../config');
const log = bunyan.createLogger({
  name: config.logger.name,
  level: config.logger.level,
  serializers: {
    error: error => ({
      message: error.message,
      stack: error.stack,
      json: error.json
    }),
    req: req => ({
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
      headers: _.omit(req.headers, ['Authorization'])
    })
  }
});

const Logger = {
  /**
   *
   */
  logger: log,


  /**
   *
   * @param name
   * @returns {XMLList}
   */
  create: name => log.child({['widget_type']: name})
};

module.exports = Logger;