'use strict'

const express = require('express');
const passport = require('passport');
const infoUserController = require('../controllers/infoUser');
const api = express.Router();

api.get('/info-user/prueba', [passport.authenticate('jwt')], infoUserController.prueba);
api.post('/info-user/add', passport.authenticate('jwt'), infoUserController.addInfo);
api.get('/info-user/get-infos', passport.authenticate('jwt'), infoUserController.getInfoUsers);
api.get('/info-user/get-info/:income', passport.authenticate('jwt'), infoUserController.getInfoUsersByIncome);
module.exports = api;