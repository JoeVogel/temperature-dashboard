const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
require('dotenv').config({
  silent: true
});

const app = express();

const port = process.env.PORT || 3000;
const connString = process.env.MONGODB_CONNECTION_STRING || '<connection_string>';

mongoose = require('mongoose');
Measure = require('./models/measureModel');

mongoose.Promise = global.Promise;
mongoose.connect(connString, {
  useNewUrlParser: true
});

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'))
// app.use(bodyParser.json());

let measureRoutes = require('./routes/measureRoutes');
let indexRoutes = require('./routes/indexRoutes');
let aboutRoutes = require('./routes/aboutRoutes');

measureRoutes(app);
indexRoutes(app);
aboutRoutes(app);

app.listen(port);

console.log('Dashboard started on port: ' + port);

// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(uri, function (err, client) {
//   if (err) {
//     throw err;
//   }

//   const collection = client.db("scanner").collection("measures");
//   // perform actions on the collection object
//   client.close();
// });