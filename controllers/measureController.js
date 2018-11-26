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
  let data = req.body.split('=').join('&').split('&');

  console.log('New measure received from ' + data[1]);

  let obj = {
    mac: data[1],
    temperature: data[5],
    humidity: data[3],
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