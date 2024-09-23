require('dotenv').config();
const mongoose = require('mongoose');
const seedCarData = require('./CarSeeder')

const dbURI = process.env.MONGO_DB_URL;

mongoose
    .connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedCarData()
    })
    .catch((err) => {
        console.error('Error:', err);
    })
//.finally(() => {
//    mongoose.connection.close();
//});

process.exit();
