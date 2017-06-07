'use strict';

// const Promise = require('bluebird');
const AppError = require('../../libs/app-error');
const AuthError = require('./auth.errors.js');
const Joi = require('joi');
const {
  MIN_EMAIL_LENGTH,
  MAX_EMAIL_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} = require('../../utils/constants');

const keys = {
  email: Joi.string().trim().email().min(MIN_EMAIL_LENGTH).max(MAX_EMAIL_LENGTH).required(),
  emailDummy: Joi.string().trim().min(MIN_EMAIL_LENGTH).max(MAX_EMAIL_LENGTH).required(),
  password: Joi.string().regex(PASSWORD_REGEX).min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH).required(),
  token: Joi.string().required()
};

const AuthValidate = {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  login: (req, res, next) => {
    const schema = Joi.object().keys(
      {
        email: keys.emailDummy, // for security reasons
        password: keys.password
      },
      {convert: true}
    );

    Joi.validate(req.body, schema, (err, value) => {
      if (err) return next(new AppError.badRequest(err.message));

      req.body = value;
      next();
    });
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  signup: (req, res, next) => {
    const schema = Joi.object().keys(
      {
        email: keys.email,
        password: keys.password,
        confirmPassword: keys.password
      },
      {convert: true}
    );

    Joi.validate(req.body, schema, (err, value) => {
      if (err) return next(new AppError.badRequest(err.message));
      
      if (value.password !== value.confirmPassword) return next(AuthError.passwordsMismatch);

      req.body = value;
      next();
    });
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  activate: (req, res, next) => {
    const schema = Joi.object().keys(
      {token: keys.token},
      {convert: true}
    );

    Joi.validate(req.params, schema, (err, value) => {
      if (err) return next(new AppError.badRequest(err.message));

      req.body = value;
      next();
    });
  },
  
};

module.exports = AuthValidate;

