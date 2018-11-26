const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
require('dotenv').config({
  silent: true
});

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

let measureRoutes = require('./routes/measureRoutes');
let indexRoutes = require('./routes/indexRoutes');
let aboutRoutes = require('./routes/aboutRoutes');

measureRoutes(app);
indexRoutes(app);
aboutRoutes(app);

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});