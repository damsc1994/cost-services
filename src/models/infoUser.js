'use struict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoUsers = new Schema({
    user: {
        type: Schema.ObjectId, 
        ref: 'User'
    },
    income: {
        type: Number,
        required: true,
        unique: true
    },
    type_period: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('InfoUser', infoUsers);