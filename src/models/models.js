const mongoose = require('mongoose')
const UserSchema = require('../schemas/UserSchema')
const GameSchema = require('../schemas/GameSchema')
const EventSchema = require('../schemas/EventSchema')

const User = mongoose.model('User', UserSchema)
const Game = mongoose.model('Game', GameSchema)
const Event = mongoose.model('Event', EventSchema)

module.exports = {
    User,
    Game,
    Event
}