'use strict';

const assets = require('../webpack-assets').get('bundle.task-manager');
const {render} = require('../../libs/render-hbs')(__dirname);

module.exports = function(req, res) {

  const html = render('task-manager.hbs', {
    styles: assets.styles,
    scripts: assets.scripts
  });

  res.send(html);
};
