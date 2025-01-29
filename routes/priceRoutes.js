const express = require('express');
const router = express.Router();
const { getEggPrices } = require('../controllers/prices');
const fetchPrice = require('../middleware/services/fetch_price');


router.get('/', getEggPrices);
// router.post('/', getEggPrices);

module.exports = router;

