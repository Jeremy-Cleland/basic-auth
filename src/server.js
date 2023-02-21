'use strict';

require('dotenv').config();
const express = require('express');

const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const usersRouter = require('./auth/routes/users');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(usersRouter);
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
