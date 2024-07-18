const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: false,
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [16, 'Password must be at most 16 characters long'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character']
    },
    username: {
        type: String,
        unique: [true, 'Username already in use'],
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username must be at most 50 characters long']
    },
    location: {
        type: String,
        required: false,
        unique: false,
        maxlength: [100, 'Location must be at most 100 characters long']
    },
    gamesOwned: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game',
        required: false,
        unique: true
    }],
    eventsAttending: [{
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: false
    }]
},
{
    timestamps: true
})

UserSchema.pre(
    "save",
    async function (next) {
        const user = this;
        if (!user.isModified("password")){
            return;
        }
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }
)

module.exports = UserSchema