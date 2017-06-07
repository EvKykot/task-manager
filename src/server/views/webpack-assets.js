'use strict';

const assets = require('./webpack-assets.json');

const WebpackAssets = {
  get: (key) => {
    const data = assets[key];

    if (!data) throw new Error('Invalid webpack asset key');

    return {
      styles: Array.isArray(data.css) ? data.css : [data.css],
      scripts: Array.isArray(data.js) ? data.js : [data.js]
    };
  }
};

module.exports = WebpackAssets;
