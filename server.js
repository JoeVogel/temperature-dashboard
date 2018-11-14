require('dotenv').config({
  silent: true
});
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_CONNECTION_STRING || '<connection_string>';

mongoose = require('mongoose');