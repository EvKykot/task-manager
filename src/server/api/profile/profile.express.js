'use strict';

const router = require('express').Router();
const ProfileService = require('./profile.service.js');
// const ProfileValidate = require('./profile.validate.js');
const AuthAccess = require('../auth/auth-access.middleware');
const wrap = require('../../utils/express-utils').wrap;

// const ExpressUtils = require('../../utils/express-utils');
// ExpressUtils.validate.wrapAll(ProfileValidate);

/**
 * @api {get} /api/v1/profile FetchProfile
 * @apiName FetchProfile
 * @apiGroup Profile
 * @apiVersion 0.1.0
 */
router.get('/',
  AuthAccess.cookie.logged,
  wrap(({user}) => ProfileService.getProfile(user._id))
);

module.exports = router;
