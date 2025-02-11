const fetch_price = require('../middleware/services/fetch_price');
const express = require('express');
const Price = require('../models/price');
const averagePrice = require('../models/averagePrice');
const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const foundEntries = await Price.find().sort({ date: -1 })


//         res.status(200).json(foundEntries);


//     } catch (error) {

//         res.status(400).json({ error: error.message });
//     }
// })

// This will now retrieve and return daily averages
router.get('/', async (req, res) => {
    try {
        const foundEntries = await averagePrice.find().sort({ date: -1 })

        res.status(200).json(foundEntries);

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
})
module.exports = router;
