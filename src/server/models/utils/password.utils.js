'use strict';

const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const AuthError = require('../../api/auth/auth.errors.js');
const SALT_FACTOR = 5;

const PasswordUtils = {

  /**
   * @method
   * @param password
   */
  hash: password => new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(password, salt, (err, data) => err ? reject(err) : resolve(data));
    });
  }),

  /**
   * @method
   * @param password
   * @param hash
   */
  isHashEqual: (password, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isEqual) => {
      if (err) return reject(err);

      if (isEqual) {
        resolve(null);
      } else {
        reject(AuthError.invalidCredentials);
      }
    });
  })

};

module.exports = PasswordUtils;
