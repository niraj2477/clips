var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var history = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    video: [{
        videoId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        timeStamp: {
            type: String
        },
        isLiked: {
            type: Boolean,
            default: false
        },
        isDisliked: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('history', history);