require('dotenv').config();

const Price = require('../../models/price');
const cron = require('node-cron');
const { getBearerToken, serviceToken } = require('./tokenService');
const { accessToken } = require('../../config');
const { get } = require('mongoose');

let bearerToken = process.env.BEARER_TOKEN;

const getValidToken = async () => {
    const token = await serviceToken();
    return token;
}

const fetchPrice = async (req, res, next) => {
    let token = await getValidToken();

\

try {
    res = await fetch(process.env.BASE_URL, {
        method: 'GET',
        headers: {

            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,

        }
    });
    let data = await res.json();

    if (!data) {
        return { error: 'Failed to fetch prices' };
    }
    // Save prices to the database
    const newEntry = new Price({
        description: data.data[0].description,
        size: data.data[0].items[0].size,
        date: new Date(),
        price: data.data[0].items[0].price.regular
    });
    await newEntry.save();
    console.log('Price fetched and saved')


} catch (error) {
    console.error('Error fetching prices:', error);
    return { error: 'Failed to fetch prices' };
}
}

// Schedule the cron job to run every day at Noon
cron.schedule('0 12 * * *', fetchPrice, {
    scheduled: true,
    timezone: "America/New_York"
});

// for testing
// cron.schedule('* * * * *', fetchPrice, {
//     scheduled: true,
//     timezone: "America/New_York"
// });

module.exports = fetchPrice;
