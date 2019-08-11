'use strict'

const express = require('express');
const passport = require('passport');
const egressController = require('../controllers/egressUser');

const api = express.Router();

api.get('/egress/prueba', passport.authenticate('jwt'), egressController.prueba);
api.post('/egress/add', passport.authenticate('jwt'), egressController.addEgress);
api.get('/egress/get-egress/:infoUserId', passport.authenticate('jwt'), egressController.getEgress);
api.get('/egress/calculate-expense/:infoUserId', passport.authenticate('jwt'), egressController.calculateExpense);
api.put('/egress/update/:egressID', passport.authenticate('jwt'), egressController.updateEgress);

module.exports = api;