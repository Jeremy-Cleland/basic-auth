'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    req.user = await user.authenticateBasic(username, password);
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send('Invalid Login');
  }
};
