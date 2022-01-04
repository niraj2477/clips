import { Schema , model } from 'mongoose';

const Video = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
        index: true
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        required: true,
        enum: ['private', 'public'],
        default: 'public'
    },
    file: {
        type: String,
        required: true,
        default: ''
    },
    isDisabled: {
        type: Boolean,
        required: true,
        default: false
    },
    like: {
        type: Number,
        required: true,
        default: 0
    },
    disLike: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    strict: true
});

export default model('Video', Video);