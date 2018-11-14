'use strict';

var mongoose = require('mongoose');

Measure = mongoose.model('measures');

exports.show = function (req, res) {
  if (req.body.mac != null) {
    res.json(getMeasures(req.body.mac));
  }
}

function getMeasures(mac) {
  let measures = {};

  Measure.find({
    mac: mac
  }, (err, result) => {
    if (err) {
      throw err;
    }

    measures = result
  });

  return measures;
}