'use strict'

const express = require('express');
const passport = require('passport');
const passportAuth = require('passport-auth');
const expressSession = require('express-session');
const compression = require('compression');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const expressKey = require('./src/util/server').secreKeyExpress;

const api = express();


// Importar Rutas
const infoUserRoutes = require('./src/routes/infoUser');
const egressRoutes = require('./src/routes/egressUser');

// Middlewware
api.use(compression());
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());
api.use(expressSession({secret: expressKey, saveUninitialized: true, resave: false}));
api.use(passport.initialize());
api.use(passport.session());

// Init passport
passportAuth(passport);

// Core
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Rutas
api.use('/api', infoUserRoutes);
api.use('/api', egressRoutes);

// Manejo de errores
api.use((err, req, res, next) => {
    if (err.message.match(/not fount/)) return res.status(404).send({
        message: chalk.red(err)
    });

    return res.status(500).send({
        message: chalk.red(err)
    });
});

module.exports = api;
