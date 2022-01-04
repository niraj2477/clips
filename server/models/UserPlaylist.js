import { Schema , model } from 'mongoose';

const UserPlaylist = new Schema({
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

export default model('UserPlaylist', UserPlaylist);