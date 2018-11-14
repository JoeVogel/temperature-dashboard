'use strict';

module.exports = function (app) {
  var controller = require('../controllers/indexController');

  app.route('/')
    .get(controller.open);
};