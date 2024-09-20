require('dotenv').config();
const mongoose = require('mongoose');
const seedCarData = require('./CarSeeder')
const Car = require('../Models/Car');

// MongoDB Connection URI from .env file
const dbURI = process.env.MONGO_DB_URL;

// Connect to MongoDB
mongoose
    .connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedCarData()
        
    })
    .catch((err) => {
        console.error('Error:', err);
        mongoose.connection.close();
    });
