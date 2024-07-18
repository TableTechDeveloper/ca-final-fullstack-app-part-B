// Import dotenv module to make .env data available for use
const dotenv = require('dotenv');
dotenv.config();

// Import express package and configure needed data
const express = require('express');
const app = express();

// User environment variables for HOST and PORT, or use default values if variables not present
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

// Import cors to allow cors middleware
const cors = require('cors');
app.use(cors());

// Let server use JSON and URL encoding structures for data formatting
app.use(express.json);
app.use(express.urlencoded({extended: true}));

// Set the database environment depending on current environment
const mongoose = require('mongoose');
var databaseURL = "";
switch (process.env.NODE_ENV.toLowerCase()) {
    case "test":
        databaseURL = 'mongodb://localhost:27017/GamePlanDB-test';
        break
    case "development":
        databaseURL = 'mongodb://localhost:27017/GamePlanDB-dev';
        break
    case "production":
        databaseURL = process.env.DATABASE_URL;
        break
    default:
        console.error("Incorrect JS environment specified, database will not be connected")
        break
}

module.exports = {
    HOST,
    PORT,
    app
}