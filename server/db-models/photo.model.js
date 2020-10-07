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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PhotoModel', PhotoModelSchema);
