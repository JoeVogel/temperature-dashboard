'use strict';

module.exports = function (app) {
  var controller = require('../controllers/aboutController');

  app.route('/about')
    .get(controller.open);
};