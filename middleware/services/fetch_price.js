const axios = require('axios');
const baseURL = process.env.BASE_URL;
const Price = require('../../models/price');
const cron = require('node-cron');

const fetchPrice = async () => {
    try {
        const { data } = await axios.get(baseURL, {
            headers: {
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const products = data.data.map(product => ({
            productId: product.productId,
            price: product.items[0]?.price?.regular,
            size: product.items[0]?.size
        }));

        for (const product of products) {
            console.log(`Product ID: ${product.productId}, Price: ${product.price}, Size: ${product.size}`);

            const newEntry = new Price({
                productId: product.productId,
                price: product.price,
                size: product.size,
                date: new Date()
            });

            await newEntry.save();
            console.log('✅ Price saved to database:', newEntry);
        }

        return products;
    } catch (error) {
        console.error('❌ Error fetching prices:', error.message);
        return { error: error.message };
    }
};

// Schedule the cron job to run every minute (for testing)
cron.schedule('* * * * *', fetchPrice, {
    scheduled: true,
    timezone: "America/New_York"
});

module.exports = fetchPrice;
