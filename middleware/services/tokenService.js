const axios = require('axios');
require('dotenv').config();
const querystring = require('querystring');
const cron = require('node-cron');

const { CLIENT_ID, CLIENT_SECRET, OAUTH2_BASE_URL, KROGER_SCOPE, REDIRECT_URL, AUTH_CODE, TOKEN_URL, AUTH_BASE_64 } = process.env;

const serviceToken = async () => {
    const token = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${AUTH_BASE_64}`,
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'scope': 'product.compact'
        }),
    });
    const tokenJson = await token.json();
    console.log(tokenJson);
    return tokenJson.access_token;
}

cron.schedule('55 11 * * *', serviceToken, {
    scheduled: true,
    timezone: "America/New_York"
});

module.exports = { serviceToken };

