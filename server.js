require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const priceRoutes = require('./routes/priceRoutes');
const fetchPrice = require('./middleware/services/fetch_price');
const { getAccessToken, getRefreshToken } = require('./middleware/services/tokenService');




const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


// Routes



app.use('/api', priceRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running')
})



