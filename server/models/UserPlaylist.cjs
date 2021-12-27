var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserPlaylist = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    video: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }]
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('UserPlaylist', UserPlaylist);