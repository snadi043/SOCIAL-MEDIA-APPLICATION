const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'I am a new user'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'feeds'
        }
    ],
});

module.exports = mongoose.model('user', userSchema);