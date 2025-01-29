const axios = require('axios');
const baseURL = process.env.BASE_URL;

const fetchPrice = async () => {
    console.log(process.env.Kroger_Bearer);
    try {
        const { data } = await axios.get(baseURL, {
            headers: {
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
        const products = data.data.map(product => ({
            productId: product.productId,

            price: product.items[0]?.price?.regular || 'N/A', // Extract price or set 'N/A' if missing
            size: product.items[0]?.size || 'Unknown',

        }));

        products.forEach(product => {
            console.log(`Product ID: ${product.productId}, Price: ${product.price}, Size: ${product.size}`);

        });

        return products
    } catch (error) {
        console.error(error);
        return { error: error.message };

    }
}

module.exports = fetchPrice;