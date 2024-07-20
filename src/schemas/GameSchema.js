const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    boardgamegeekref: {
        type: Number,
        required: true,
        unique: true
    },
    yearpublished: {
        type: String,
        required: true
    },
    minplayers: {
        type: Number,
        required: false
    },
    maxplayers: {
        type: Number,
        required: false
    },
    playtime: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
});

module.exports = GameSchema