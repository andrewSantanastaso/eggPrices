const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
})

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
