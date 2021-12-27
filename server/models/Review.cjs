var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = new Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    },
    message: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('Review', Review);