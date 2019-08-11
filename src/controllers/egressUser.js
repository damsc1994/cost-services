'use strict'
const EgressModel = require('../models/egressUser');

function prueba(req, res) {
    res.status(200).send({message: 'Estoy en controlador de Egresos de usuario'});
}

function addEgress(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'El usaurio no tiene permiso para esta accion'});

    const body = req.body;
    const egress = new EgressModel({
        infoUser: body.infoUserID,
        name: body.name.toUpperCase(),
        value: body.value
    });

    EgressModel.find({name: egress.name}, (err, egresResult) => {
        if (err) return res.status(500).send({message: 'ERROR AL INTENTAR CONSULTAR LOS EGRESSOS DEL USAURIO'});

        if (egresResult.length > 0) return res.status(201).send({message: `EL GASTO ${egress.name} YA ESTA REGISTRADO`});

        egress.save((err, egressSaved) => {
            if (err) return res.status(500).send({message: 'ERROR AL INTENTAR GUARDAR EL EGRESO'});
    
            return res.status(200).send({egress: egressSaved});
        });
    });
}

function updateEgress(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'El usaurio no tiene permiso para esta accion'});

    const body = req.body;
    const egressID = req.params.egressID;
    const egress = new EgressModel({
        _id: egressID,
        name: body.name.toUpperCase(),
        value: body.value
    });

    EgressModel.findByIdAndUpdate(egressID, egress, {new: true, upsert: false},(err, egressUpdated) => {
        if (err) return res.status(500).send({message: 'ERROR AL INTENTAR MODIFICAR EL EGRESO'});

        if (!egressUpdated) return res.status(404).send({message: `NO SE HA ENCONTRADO EL GASTO ${egress.name}`})
        return res.status(200).send({egress: egressUpdated});
    });
}

function getEgress(req, res) {
    if (!req.user || !req.user._id) return res.status(401).send({message: 'El usaurio no tiene permiso para esta accion'});
    
    if (req.params.infoUserId == null || req.params.infoUserId == undefined) return res.status(401).send({message: 'El valor infoUserID no es correcto'});
    const infoUserID = req.params.infoUserId;
    EgressModel.find({infoUser: infoUserID},(err, egress) => {
        if (err) return res.status(500).send({message: `ERROR AL INTENTAR LISTAR LOS EGRESS DEL USUARIO ${req.user.name} ${req.user.last_name}`});

        return res.status(200).send({egress});
    });
}

function calculateExpense(req, res){
    if (!req.user || !req.user._id) return res.status(401).send({message: 'El usaurio no tiene permiso para esta accion'});
    
    if (req.params.infoUserId == null || req.params.infoUserId == undefined) return res.status(401).send({message: 'El valor infoUserID no es correcto'});
    const infoUserID = req.params.infoUserId;

    EgressModel.find({infoUser: infoUserID},(err, egress) => {
        if (err) return res.status(500).send({message: `ERROR AL INTENTAR LISTAR LOS EGRESS DEL USUARIO ${req.user.name} ${req.user.last_name}`});
        if (egress.length <= 0) return res.status(200).send({value: 0});

        const value = egress.map((egress) => egress.value).reduce((acum, egreValue) => Number(acum) + Number(egreValue));
        return res.status(200).send({value});
    });
}

module.exports = {
    prueba,
    addEgress,
    updateEgress,
    getEgress,
    calculateExpense
}