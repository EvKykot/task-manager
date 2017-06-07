'use strict';

var webpack = require('webpack');
var router = require('express').Router();
var config = require('../../webpack-client.config.dev.js');
var compiler = webpack(config);

router.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

router.use(require('webpack-hot-middleware')(compiler));

module.exports = router;

/*
 app.get('/__webpack_hmr', (req, res) => {
 proxy.web(req, res, {target: 'http://localhost:3000'});
 });

 app.get(/\.hot-update\.json$/i, (req, res) => {
 proxy.web(req, res, {target: 'http://localhost:3000'});
 });

 app.get(/\.hot-update\.js$/i, (req, res) => {
 proxy.web(req, res, {target: 'http://localhost:3000'});
 });
 */