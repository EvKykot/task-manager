'use strict';

// const Promise = require('bluebird');
const User = require('../../models/user.model');

const ProfileService = {
  
  /**
   *
   * @param userId
   */
  getProfile: userId => User.getById(userId),

};

module.exports = ProfileService;
