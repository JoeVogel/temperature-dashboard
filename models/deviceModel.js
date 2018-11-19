'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  mac: String,
  description: String,
  localization: String
});

module.exports = mongoose.model('devices', deviceSchema);