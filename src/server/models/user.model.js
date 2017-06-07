'use strict';

const AuthError = require('../api/auth/auth.errors');
const PasswordUtils = require('./utils/password.utils');
const ObjectId = require('mongodb').ObjectId;
const MDB = require('./mdb');
const {ERROR_MONGODB_DUPLICATE} = require('../utils/constants');

const User = MDB.collection({
  name: 'users',
  indexes: [
    {key: {email: 1}, unique: true}
  ]
}, {
  
  /**
   *
   * @param $
   * @param params
   * @param params.email
   * @param params.password
   */
  create: ($, params) =>
    PasswordUtils
      .hash(params.password)
      .then((hash) => {
        const user = {
          email: params.email.toLowerCase(),
          password: hash,
          role: 'user',
          emailVerified: false,
          createdAt: new Date()
        };

        return $
          .insertOne(user)
          .then(() => user);
      })
      .catch((err) => {
        if (err.code === ERROR_MONGODB_DUPLICATE) {
          throw AuthError.userExist;
        }
        throw err;
      }),

  /**
   *
   * @param $
   * @param email
   * @param password
   */
  auth: ($, email, password) =>
    $
      .find({email: email.toLowerCase()})
      .limit(1)
      .next()
      .then((user) => {
        if (!user) throw AuthError.invalidCredentials;

        return PasswordUtils
          .isHashEqual(password, user.password)
          .then(() => {
            delete user.password;
            return user;
          });
      }),

  /**
   *
   * @param $
   * @param email
   */
  activate: ($, email) => {
    const sQuery = {email: email.toLowerCase()};

    return $
      .find(sQuery, {password: 0})
      .limit(1)
      .next()
      .then((user) => {
        if (!user) throw AuthError.notFound;
        if (!user.emailVerified) {
          const uQuery = {$set: {emailVerified: true}};

          return $
            .updateOne(sQuery, uQuery)
            .then(() => email);
        }
        return email;
      });
  },

  /**
   *
   * @param $
   * @param id
   */
  getById: ($, id) =>
    $
      .find({_id: new ObjectId(id)}, {password: 0})
      .limit(1)
      .next()
      .then((user) => {
        if (!user) throw AuthError.notFound;
        return user;
      }),
});

module.exports = User;
