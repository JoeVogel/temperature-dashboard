'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measureSchema = new Schema({
  date: Date,
  mac: String,
  humidity: Number,
  temperature: Number
});

module.exports = mongoose.model('measures', measureSchema);