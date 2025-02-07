const fetch_price = require('../middleware/services/fetch_price');
const Price = require('../models/price');
const router = require('express').Router();

router.get('/api', async (req, res) => {
    try {
        const foundEntries = await Price.find().sort({ date: -1 }).
            console.log(foundEntries);

        res.status(200).json(foundEntries);


    } catch (error) {
        console.error('Error in getEggPrices:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;
