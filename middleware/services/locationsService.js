const LocationURL = process.env.KROGER_LOCATION_URL

const { serviceToken } = require('./tokenService');

const getValidToken = async () => {
    const token = await serviceToken();
    return token;
}

const fetchLocations = async (req, res, next) => {
    let token = await getValidToken();
    try {
        const response = await fetch(LocationURL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const data = await response.json();
        const locationIds = data.data.map(location => location.locationId);

        return locationIds;

    } catch (error) {

    }
}

// const addTodaysPriceToLocations = async (id, price) => {
//     try {
//         const response = await fetch(`${LocationURL}/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             }
//         })
//         const data = await response.json();


//     } catch (error) {
//         console.error('Error fetching locations:', error);
//     }

module.exports = { fetchLocations }