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
    description: {
        type: String
    },
    size: {
        type: String
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }

})

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
