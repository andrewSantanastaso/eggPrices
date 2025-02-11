const mongoose = require('mongoose');


const averagePriceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    averagePrice: {
        type: Number,
        required: true
    }
})

const AveragePrice = mongoose.model('AveragePrice', averagePriceSchema);

module.exports = AveragePrice;