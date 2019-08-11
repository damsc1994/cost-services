'use strict'

const http = require('http');
const api = require('./api');
const dbUtil = require('./src/util/db');
const ultiServer = require('./src/util/server');
const mongoose = require('mongoose');
const chalk = require('chalk');

const server = http.createServer(api);


server.listen({port: ultiServer.port}, () => {
    console.log(`El servidor ha iniciado en el puerto ${ultiServer.port}`);
    mongoose.connect(dbUtil.infoConection.url, {useNewUrlParser: true,  useCreateIndex: true, useFindAndModify: false})
    const conection = mongoose.connection;
    conection.on('open', () => {
        console.log(chalk.yellow('El conexio a la base de datos ha iniciado'));
    });
});