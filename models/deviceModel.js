'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  mac: String,
  description: String,
  latitude: String,
  longitude: String
});

module.exports = mongoose.model('devices', deviceSchema);