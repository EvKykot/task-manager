'use strict';

const AppError = require('../../libs/app-error');

/**
 * @apiDefine AuthError
 *
 * @apiError (Error code) 100 Unauthorized
 * @apiError (Error code) 101 User already exist
 * @apiError (Error code) 102 Invalid credentials
 * @apiError (Error code) 103 Password mismatch
 * @apiError (Error code) 104 Email not confirmed
 * @apiError (Error code) 105 Invalid authorization header
 * @apiError (Error code) 106 Invalid token
 * @apiError (Error code) 107 Token expired
 * @apiError (Error code) 108 Forbidden action
 *
 */

const AuthError = {
  unauthorized: AppError.unauthorized('Unauthorized', {code: 100}),
  userExist: AppError.badRequest('Email already used', {code: 101}),
  invalidCredentials: AppError.badRequest('Invalid e-mail or password!', {code: 102}),
  passwordsMismatch: AppError.badRequest('Passwords do not match', {code: 103}),
  emailNotConfirmed: AppError.forbidden('Please confirm your email address via received activation link', {code: 104}),
  invalidAuthorizationHeader: AppError.badRequest('Invalid authorization header', {code: 105}),
  invalidToken: AppError.badRequest('Invalid token', {code: 106}),
  expired: AppError.badRequest('Token expired', {code: 107}),
  forbidden: AppError.forbidden('Forbidden action', {code: 108}),
  notFound: AppError.notFound('User not found', {code: 109})
};

module.exports = AuthError;
