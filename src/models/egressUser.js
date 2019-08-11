'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EgressUserSchema = new Schema({
    infoUser: {
        type: Schema.ObjectId,
        ref: 'InfoUser'
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('EgressUser', EgressUserSchema);
