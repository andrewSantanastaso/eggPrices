const express = require('express');
const router = express.Router();
const { getEggPrices } = require('../controllers/prices');
const fetchPrice = require('../middleware/services/fetch_price');

router.get('/', getEggPrices);

module.exports = router;

