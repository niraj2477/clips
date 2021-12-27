var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Complaint = new Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Video'
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
}, {
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('Complaint', Complaint);