'use strict';

// const Promise = require('bluebird');
const User = require('../../models/user.model');
const AuthToken = require('./auth-token');
const AuthErrors = require('./auth.errors');
const config = require('../../config');
const Email = require('../../email');

const AuthController = {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  signup: (req, res, next) => {
    User.create(req.body)
      .then((user) => {
        const emailPayload = {_id: user._id, email: user.email};
        const emailToken = AuthToken.generate(emailPayload, config.email.secret);

        return {user, emailToken};
      })
      .then(({user, emailToken}) => Email.sendVerifyEmail(user, emailToken))
      .then(email => res.send({email}))
      .catch(error => next(error));
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  login: (req, res, next) => {
    User.auth(req.body.email, req.body.password)
      .then((user) => {
        const payload = {_id: user._id, email: user.email, role: user.role};
        const token = AuthToken.set(res, payload, config.jwt.secret);
        
        if (!user.emailVerified) return next(AuthErrors.emailNotConfirmed);
        
        res.send({jwt: token});
      })
      .catch(error => next(error));
  },

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  activate: (req, res, next) => {
    AuthToken.verify(req.body.token, config.email.secret, (err, data) => {
      if (err) return next(err);

      User.activate(data.email)
        .then(email => res.send(`Your account "${email}" was successfully activated`))
        .catch(error => next(error));
    });
  }

};

module.exports = AuthController;
