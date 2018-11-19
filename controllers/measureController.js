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

  let newMeasure = new Measure(req.body);

  newMeasure.save((err, task) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }

    res.status(201).json(task);
  });
}

//With the query parameters from req, build a query string
function generateQuery(req) {

  let query = {};

  if (req.query.mac != null && req.query.mac != "") {
    query.mac = req.body.mac
  }

  if (req.query.startDate != null && req.query.endDate != null && req.query.startDate != "" && req.query.endDate != "") {
    query.date = {
      $gte: req.query.startDate,
      $lte: req.query.endDate
    };
  }

  return query;

}