const apiBaseUrl = process.env.API_BASE_URL;
const oauth2BaseUrl = process.env.OAUTH2_BASE_URL;
const clientId = process.env.CLIENT_ID;
const redirectUrl = process.env.REDIRECT_URL;
const clientSecret = process.env.CLIENT_SECRET;
let accessToken = process.env.BEARER_TOKEN;
let refreshToken = process.env.REFRESH_TOKEN;

module.exports = { apiBaseUrl, oauth2BaseUrl, clientId, redirectUrl, clientSecret, accessToken, refreshToken };
