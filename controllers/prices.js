const fetch_price = require('../middleware/services/fetch_price');
const Price = require('../models/price');

// exports.getEggPrices = async (req, res) => {
//     try {
//         console.log('Fetching prices...');

//         const priceData = await fetch_price();
//         console.log(priceData);

//         if (priceData.error) {
//             return res.status(500).json({ message: priceData.error });
//         }

//         // Save prices to the database
//         for (const product of priceData) {
//             const priceEntry = new Price({
//                 productId: product.productId, // Add productId for tracking
//                 description: product.description,
//                 date: new Date(),
//                 price: product.price
//             });

//             console.log(`Saving price for ${product.description}: $${product.price}`);
//             await priceEntry.save();
//         }

//         res.status(200).json({ message: 'Prices fetched and saved to database', data: priceData });

//     } catch (error) {
//         console.error('Error in getEggPrices:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
exports.getEggPrices = async (req, res) => {
    try {
        const foundEntries = await Price.find().sort({ date: -1 });
        console.log(foundEntries);

        res.status(200).json(foundEntries);


    } catch (error) {
        console.error('Error in getEggPrices:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
