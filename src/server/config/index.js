'use strict';

const merge = require('merge');
const path = require('path');
const root = path.normalize(`${__dirname}/../..`);
const env = process.env.NODE_ENV || 'development';

// All configurations will extend these options
// ============================================
let config = {
  root,
  env,
  views: path.normalize(`${root}/views/`),
  static: path.normalize(`${root}/client/`),
  port: process.env.PORT || '9000',
  host: process.env.HOST || 'localhost',
  baseUrl: 'http://localhost:3000',

  //uploadDir: path.normalize(root + '/../upload'),
  //uploadDirName: '/upload',

  logger: {
    name: 'app',
    level: 'debug'
  },

  //================= nodemailer =================
  email: {
    name: 'Generator MVP',
    sender: 'generator.mvp@gmail.com',
    password: 'PlCXVju4eFAom46z',
    api: 'http://localhost:3000/api/v1/auth/activate',
    secret: 'gujuh6CUThekub5A'
  },

  //================= mongodb =================
  mongo: {
    options: {
      server: {
        poolSize: 10
      }
    }
  },

  jwt: {
    secret: 'd65kbcv4jkg5123b',
    options: {
      algorithm: 'HS256',
      expiresIn: '12h'
    }
  },

  //================= session =================
  sessionStoreTTL: 2592000, // in seconds (30 days)
  session: {
    name: 'SID',
    resave: false,
    saveUninitialized: false,
    secret: 'sdvc3b-fd124a89-y68v4s',
    cookie: {
      maxAge: 2592000000 // in ms (30 days)
    }
  }
};

const envConfig = require(`./${config.env.trim()}.js`) || {};

config = merge.recursive(config, envConfig);

module.exports = config;