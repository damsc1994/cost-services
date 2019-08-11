'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../util/server').secreKeyPassport;

module.exports = (token) => {
    return jwt.verify(token, secret);
}