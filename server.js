require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetchPrice = require('./middleware/services/fetch_price');
const { getAccessToken, getRefreshToken } = require('./middleware/services/tokenService');
const pricesRouter = require('./controllers/prices');



const app = express();

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
})
mongoose.connection.on('error', () => {
    console.error('Error connecting to mongoDB')
})
app.use(cors())

app.use(express.json())


// Routes



app.use('/api', pricesRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})



