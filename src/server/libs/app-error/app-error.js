'use strict';

const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
  ERROR_NOT_IMPLEMENTED
} = require('../../utils/constants');

/**
 * @apiDefine AppError
 *
 * @apiError (Error 4xx, 5xx) {Number} status http code
 * @apiError (Error 4xx, 5xx) {String} message error message
 * @apiError (Error 4xx, 5xx) {Number} code error code
 * @apiError (Error 4xx, 5xx) {Object} [data] error details
 *
 */

/**
 *
 * @param {number} httpCode
 * @param {string} msg
 * @param {object} [data]
 * @returns {AppError}
 * @constructor
 */
function AppError(msg, httpCode, data) {
  this.httpCode = httpCode || ERROR_BAD_REQUEST;
  this.message = msg || 'Bad Request';
  this.code = data ? data.code : null;
  this.json = {
    status: httpCode,
    code: data ? data.code : 0,
    message: this.message,
    data
  };
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

AppError.badRequest = (msg, data) => new AppError(msg || 'Bad Request', ERROR_BAD_REQUEST, data);

AppError.unauthorized = (msg, data) => new AppError(msg || 'Unauthorized', ERROR_UNAUTHORIZED, data);

AppError.forbidden = (msg, data) => {
  if (typeof msg === 'object') {
    return new AppError('Forbidden', ERROR_FORBIDDEN, msg);
  }
  return new AppError(msg || 'Forbidden', ERROR_FORBIDDEN, data);
};

AppError.notFound = (msg, data) => new AppError(msg || 'Not Found', ERROR_NOT_FOUND, data);

AppError.internalServerError = (msg, data) => {
  if (typeof msg === 'object') {
    return new AppError('Internal Server Error', ERROR_INTERNAL_SERVER, msg);
  }
  return new AppError(msg || 'Internal Server Error', ERROR_INTERNAL_SERVER, data);
};

AppError.notImplemented = (msg, data) => new AppError(msg || 'Not Implemented', ERROR_NOT_IMPLEMENTED, data);

module.exports = AppError;
module.exports.e = AppError;
