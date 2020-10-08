const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoModelSchema = new Schema({
    ownerId: {
        type: String,
        required: [true, 'Please add ownerId'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    accessibleTo: {
        type: [String],
        required: [true, 'Please add accessibleTo'],
    },
    fileName: {
        type: String,
        required: [true, 'Please add fileName'],
    },
    name: {
        type: String,
        required: [true, 'Please add name'],
    },
    url: {
        type: String,
        required: [true, 'Please add url'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PhotoModel', PhotoModelSchema);
