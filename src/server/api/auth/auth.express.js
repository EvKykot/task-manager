'use strict';

const router = require('express').Router();
// const AuthAccess = require('./auth-access.middleware');
const AuthValidate = require('./auth.validate');
const AuthController = require('./auth.controller.js');

/**
 * @api {post} /api/v1/auth/login login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
router.post('/login',
  AuthValidate.login,
  AuthController.login
);

/**
 * @api {post} /api/v1/auth/signup SignUp
 * @apiName SignUp
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
router.post('/signup',
  AuthValidate.signup,
  AuthController.signup
);

/**
 * @api {get} /api/v1/auth/activate/:token activate
 * @apiName Activate
 * @apiGroup Auth
 * @apiVersion 0.1.0
 */
router.get('/activate/:token',
  AuthValidate.activate,
  AuthController.activate
);

module.exports = router;
