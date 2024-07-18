// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { host, port, databaseURL } = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (databaseURL) {
    mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.error('Database connection error:', err));
} else {
    console.error('No valid database URL provided');
}

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

module.exports = app;