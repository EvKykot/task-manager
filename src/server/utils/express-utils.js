/* eslint-disable promise/catch-or-return */
'use strict';

const ExpressUtils = {
  getFn(fn) {
    return (req, res, next) => {
      fn(req.query).then(
        responseData => res.send(responseData),
        error => next(error)
      );
    };
  },

  postFn(fn) {
    return (req, res, next) => {
      fn(req.body).then(
        responseData => res.send(responseData),
        error => next(error)
      );
    };
  },

  wrap(fn) {
    return (req, res, next) => {
      fn(req, res).then(
        responseData => res.send(responseData),
        error => next(error)
      );
    };
  },

  validate: {
    wrapAll(target) {
      for (const method in target) {
        if (typeof target[method] !== 'function') continue;

        target[method].$query = ExpressUtils.validate.wrapQuery(target[method]);
        target[method].$body = ExpressUtils.validate.wrapBody(target[method]);
      }
    },

    wrapQuery(fn) {
      return (req, res, next) => {
        fn(req.query, (err, data) => {
          if (err) return next(err);
          req.query = data;
          next();
        });
      };
    },

    wrapBody(fn) {
      return (req, res, next) => {
        fn(req.body, (err, data) => {
          if (err) return next(err);
          req.body = data;
          next();
        });
      };
    }
  }
};


module.exports = ExpressUtils;