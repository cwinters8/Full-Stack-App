'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// enable CORS
app.use(cors());

// body parsing
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// database
mongoose.connect(
  'mongodb://localhost:27017/fsjstd-restapi', 
  {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}
);
const db = mongoose.connection;
db.on('error', err => {
  console.error('Connection error:', err);
});
db.once('open', () => {
  console.log('DB Connection Successful');
});

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// use the routes module
app.use('/api', routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
