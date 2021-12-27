var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    },
    description: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    }
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('Comment', Comment);