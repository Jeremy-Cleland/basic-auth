'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./usersModel');

const DATABASE_URL =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const usersModel = users(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  clothesCollection: new users(usersModel),
};
