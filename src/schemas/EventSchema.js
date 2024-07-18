const mongoose = require('mongoose')

const isPublished = function () {
    return this.status === 'published'
}

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: isPublished,
        unique: false
    },
    host: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: isPublished,
        unique: false
    },
    participants:[{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: isPublished,
        unique: false
    }],
    eventDate: {
        type: Date,
        required: isPublished,
        unique: false
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: "Game",
        unique: false,
        required: true
    },
    location: {
        type: String,
        unique: false,
        required: isPublished
    },
    minParticipants: {
        type: Number,
        unique: false,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: isPublished,
        unique: false
    },
    gamelength: {
        type: Number,
        required: isPublished,
        unique: false
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'published',
        required: true,
        unique: false
    }
},
{
    timestamps: true
})


module.exports = EventSchema