require('dotenv').config();
const Price = require('../../models/price');
const AveragePrice = require('../../models/averagePrice');
const cron = require('node-cron');
const { serviceToken } = require('./tokenService');
const { fetchLocations } = require('./locationsService');

const getValidToken = async () => {
    return await serviceToken();
};

const fetchPrice = async () => {
    try {
        let token = await getValidToken();
        let locations = await fetchLocations(); // ✅ Ensure locations is an array
        let locationLength = locations.length;
        let todaysTotal = 0;
        let saveOperations = [];

        for (const locationId of locations) {
            try {
                console.log(`Fetching ${locations.indexOf(locationId) + 1} of ${locationLength}...`);

                const response = await fetch(`https://api.kroger.com/v1/products?filter.term=eggs&filter.locationId=${locationId}&filter.productId=0001111060903`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    console.error(`API request failed for location ${locationId}: ${response.status}`);
                    locationLength--; // Exclude failed location from average
                    continue;
                }

                let data = await response.json();
                if (!data?.data?.length) {
                    console.warn(`No valid data for location ${locationId}`);
                    locationLength--; // Exclude from average
                    continue;
                }

                const price = parseFloat(data.data[0]?.items?.[0]?.price?.regular);
                if (isNaN(price) || price === 0) {
                    console.warn(`Invalid price for location ${locationId}, skipping...`);
                    locationLength--;
                    continue;
                }

                const newEntry = new Price({
                    description: data.data[0]?.description || 'Unknown',
                    size: data.data[0]?.items?.[0]?.size || 'Unknown',
                    date: new Date(),
                    price,
                    locationId,
                });

                saveOperations.push(newEntry.save()); // ✅ Save operation added
                todaysTotal += price;
            } catch (error) {
                console.error(`Error fetching prices for location ${locationId}:`, error);
                locationLength--; // Exclude failed location
            }
        }

        // ✅ Wait for all saves to complete
        await Promise.all(saveOperations);

        // ✅ Compute and store the daily average
        if (locationLength > 0) {
            const dailyAverage = parseFloat((todaysTotal / locationLength).toFixed(2)) || 0;
            console.log(`Today's Average Price: ${dailyAverage}`);

            const newAveragePrice = new AveragePrice({
                date: new Date(),
                averagePrice: dailyAverage,
            });

            await newAveragePrice.save();
            console.log('Saved daily average price:', newAveragePrice);
        } else {
            console.warn('No valid prices recorded today, skipping daily average calculation.');
        }
    } catch (criticalError) {
        console.error('Critical error in fetchPrice:', criticalError);
    }
};


// cron.schedule('* 12 * * *', fetchPrice, {
//     scheduled: true,
//     timezone: "America/New_York"
// });


fetchPrice();
module.exports = fetchPrice;
