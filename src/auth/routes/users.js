'use strict';

const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basic.js');

router.post('/signup');

router.post('/signin', basicAuth);

module.exports = router;
