/* eslint-disable no-undef */
'use strict';

const express = require('express');
const path = require('path');
const HMRRouter = require('./webpack-hmr-router');
const port = process.env.NODE_ENV || 3000;
const app = express();
const httpProxy = require('http-proxy');
const ROOT = path.join(__dirname, '../');
const proxy = httpProxy.createProxyServer({});


app.use(HMRRouter);
app.use(express.static(ROOT));
app.use(express.static(path.join(ROOT, 'client')));
app.use('/*', proxyToMainServer());

app.listen(port);

/**
 *
 * @returns {Function}
 */
function proxyToMainServer() {
  return (req, res) => {
    req.url = req.originalUrl;
    proxy.web(req, res, {target: 'http://127.0.0.1:9000'});

    proxy.on('error', function (error) {
      res.status(500).send(new Error(`Main server is unavailable ${JSON.stringify(error)}`));
    });
  };
}

// /**
//  *
//  * @param file
//  * @returns {Function}
//  */
// function sendFile(file) {
//   return (req, res) => {
//     res.sendFile(path.join(ROOT, file));
//   };
// }
