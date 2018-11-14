'use strict';

module.exports = function (app) {
  var measure = require('../controllers/measureController');

  // Measure Routes
  app.route('/measure')
    .get(measure.show);
};