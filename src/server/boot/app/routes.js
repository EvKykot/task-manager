'use strict';

const {logger} = require('../../utils/logger');
const {
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER
} = require('../../utils/constants');

module.exports = (app) => {

  require('../../views')(app);

  app.use('/api/v1', require('../../api'));
  app.post('*', (req, res) => res.status(ERROR_NOT_FOUND).end());
  app.use('*', (req, res) => res.status(ERROR_NOT_FOUND).send(`${ERROR_NOT_FOUND}`));


  app.use((error, req, res, next) => {
    if (error.httpCode) {
      logger.warn({error, req});
      res.status(error.httpCode).json(error.json);
    } else {
      logger.error({error, req});
      res.status(ERROR_INTERNAL_SERVER).json({message: error.message});
    }
  });
};
