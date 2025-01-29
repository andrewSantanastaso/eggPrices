const fetch_price = require('../middleware/services/fetch_price');

exports.getEggPrices = async (req, res) => {
    try {
        console.log('Fetching prices...');

        const priceData = await fetch_price();

        if (priceData.error) {
            return res.status(500).json({ message: priceData.error });
        }

        res.status(200).json(priceData || { message: 'No data found' });

    } catch (error) {
        console.error('Error in getEggPrices:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
