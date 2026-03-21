const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);
module.exports = Blacklist;