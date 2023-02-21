'use strict';
const bcrypt = require('bcrypt');

const userSchema = (sequelizeDatabase, DataTypes) => {
  const model = sequelizeDatabase.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  model.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 5);
    console.log('hashed password');
    user.password = hashedPassword;
    console.log('our user', user);
  });

  return model;
};

module.exports = userSchema;
