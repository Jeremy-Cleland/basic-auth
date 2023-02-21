'use strict';

require('dotenv').config();
const express = require('express');

const notFound = require('./auth/middleware/404');
const errorHandler = require('./auth/middleware/500');
const router = require('./auth/router');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to main route!');
});

function start() {
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};
