'use strict';

const jwt = require('jsonwebtoken');
const AuthError = require('./auth.errors');
const config = require('../../config');

const AuthToken = {

  /**
   *
   * @param payload
   * @param secret
   */
  generate: (payload, secret) => jwt.sign(payload, secret, config.jwt.options),

  /**
   *
   * @param token
   * @param secret
   * @param done
   */
  verify: (token, secret, done) => {
    jwt.verify(token, secret, config.jwt.options, (err, data) => {
      if (!err) return done(null, data);

      if (err.name === 'TokenExpiredError') {
        done(AuthError.expired);
      } else {
        done(AuthError.invalidToken);
      }
    });
  },


  /**
   *
   * @param res
   * @param data
   * @param secret
   * @returns {String} token
   */
  set: (res, data, secret) => {
    const token = AuthToken.generate(data, secret);
    res.cookie('jwt', token, {expires: 0, path: '/'});

    return token;
  },


  /**
   *
   * @param res
   */
  remove: (res) => {
    res.clearCookie('jwt', {path: '/'});
  },


  /**
   *
   * @param req
   * @param done
   */
  extractFromCookie: (req, done) => {
    const token = req.cookies.jwt;

    if (!token) return done(AuthError.unauthorized);

    AuthToken.verify(token, config.jwt.secret, (err, data) => {
      if (err) return done(AuthError.invalidToken);
      req.user = data;

      done(null, data);
    });
  },


  /**
   *
   * @param req
   * @param done
   * @returns {*}
   */
  extractFromHeader: (req, done) => {
    const bearer = req.header('Authorization');

    if (!bearer) return done(AuthError.unauthorized);

    if (bearer.indexOf('Bearer ') !== 0) return done(AuthError.invalidAuthorizationHeader);

    const token = bearer.replace('Bearer ', '').trim();
    if (!token) return done(AuthError.unauthorized);

    AuthToken.verify(token, config.jwt.secret, (err, data) => {
      if (err) return done(AuthError.invalidToken);
      req.user = data;

      done(null, data);
    });
  }
};

module.exports = AuthToken;
