'use strict'

var mongoose = require('mongoose');

var Device = mongoose.model('devices');

exports.open = function (req, res) {

  Device.find({}, function (err, devices) {
    let data = {};

    if (err) {
      console.log(err);
      res.status(500);
    }

    res.render('pages/index', {
      "devices": devices
    });


  });
}