const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_CONNECTION_STRING || '<connection_string>';

const options = {
  // reconnectTries: Number.MAX_VALUE,
  // poolSize: 10,
  useNewUrlParser: true
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require('../models/measureModel');
require('../models/deviceModel');