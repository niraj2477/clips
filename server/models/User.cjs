var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    avatar: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    countryCode: {
        type: String
    },
    mobile: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    address: [{
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        landmark: {
            type: String
        }
    }],
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    channel: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    region: {
        type: String
    },
    dob: {
        type: Date
    },
    googleId: {
        type: String,
        unique: true
    },
    accessToken: {
        type: String,
        index: true
    }
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('User', User);