'use strict';

const AuthToken = require('./auth-token');
const AuthError = require('./auth.errors');

const AuthAccess = {
  cookie: {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    anyone: (req, res, next) => {
      AuthToken.extractFromCookie(req, (err) => {
        if (err) AuthToken.remove(res);
        next();
      });
    },


    /**
     *
     * @param req
     * @param res
     * @param next
     */
    logged: (req, res, next) => {
      AuthToken.extractFromCookie(req, (err) => {
        if (!err) return next();

        AuthToken.remove(res);
        next(err);
      });
    },


    /**
     *
     * @param req
     * @param res
     * @param next
     */
    admin: (req, res, next) => {
      this.logged(req, res, (err) => {
        if (err) return next(err);
        if (req.user.role !== 'admin') {
          return next(AuthError.forbidden);
        }

        next();
      });
    }
  },


  header: {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    anyone: (req, res, next) => {
      AuthToken.extractFromHeader(req, (err) => {
        if (err) AuthToken.remove(res);
        next();
      });
    },


    /**
     *
     * @param req
     * @param res
     * @param next
     */
    logged: (req, res, next) => {
      AuthToken.extractFromHeader(req, (err) => {
        if (!err) return next();

        AuthToken.remove(res);
        next(err);
      });
    },


    /**
     *
     * @param req
     * @param res
     * @param next
     */
    admin: (req, res, next) => {
      this.logged(req, res, (err) => {
        if (err) return next(err);
        if (req.user.role !== 'admin') {
          return next(AuthError.forbidden);
        }

        next();
      });
    }
  }
};

module.exports = AuthAccess;
