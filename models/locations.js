const mongoose = require('mongoose');
const Price = require('./price');

const locationSchema = new mongoose.Schema({
    locationId: {
        type: String,
        required: true,
    },
    address: {

        city: { type: String },
        state: { type: String },
        zipCode: { type: String },

    },




})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
