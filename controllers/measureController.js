'use strict';

var mongoose = require('mongoose');

var Measure = mongoose.model('measures');

exports.show = function (req, res) {
  let query = generateQuery(req);

  Measure.find(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).json(result);
  });

}

exports.createNewMeasure = function (req, res) {
  console.log('New measure received from ' + req.body.mac);
  //console.log('New measure received from ' + req.body);

  let obj = {
    mac: req.param('mac'),
    temperature: req.param('temperature'),
    humidity: req.param('humidity'),
    date: new Date()
  }

  let newMeasure = new Measure(obj);

  newMeasure.save(function (err, measure) {
    if (err) {
      console.log(err);
      res.send();
    }

    console.log('Data Saved');
    res.json(measure);
  });
}

//With the query parameters from req, build a query string
function generateQuery(req) {

  let query = {};

  if (req.query.mac != null && req.query.mac != "") {
    query.mac = req.query.mac
  }

  if (req.query.startDate != null && req.query.endDate != null && req.query.startDate != "" && req.query.endDate != "") {
    query.date = {
      $gte: req.query.startDate,
      $lte: req.query.endDate
    };
  }

  return query;

}