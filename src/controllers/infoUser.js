'use strict'

const InfoUserModel = require('../models/infoUser');

function prueba(req, res) {
    return res.status(200).send({
        message: 'Esta es la funcion de prueba el controlador info users'
    });
}

function addInfo(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'No esta autorizado para acceder a esta funcion'});

    const user = req.user;
    const body = req.body;

    if (!body.income || !body.type_period) return res.status(404).send({message: 'En la peticion no se encontraron todas las propiedades necesaria para esta accion'});

    const infoU = new InfoUserModel({
        user: user._id,
        income: body.income,
        type_period: body.type_period
    });

    infoU.save((err, infoUserSaved) => {
        if (err) return res.status(500).send({message: `Error al guardar la informacion del usuario: ${err}`});

        return res.status(200).send({
            infoUserSaved
        });
    });
}

function getInfoUsers(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'No esta autorizado para acceder a esta funcion'});

    InfoUserModel.find({user: req.user._id}, (err, infoUsers)=> {
        if (err) return res.status(500).send({message: `Error al intentar obtener la informacion del usuario: ${err.stack}`});

        return res.status(200).send({
            infoUsers
        })
    });
}

function getInfoUsersByIncome(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'No esta autorizado para acceder a esta funcion'});
    const income = req.params.income;
    
    InfoUserModel.findOne({user: req.user._id, income}, (err, infoUser) => {
        if (err) return res.status(500).send({message: `Error al intentar obtener la informacion del usuario: ${err.stack}`});
        if (!infoUser) return res.status(404).send({message: `No se encontraron Ingresos para este usuaro`});
        return res.status(200).send({
            infoUser
        })
    });
}

module.exports = {
    prueba,
    addInfo,
    getInfoUsers,
    getInfoUsersByIncome
}