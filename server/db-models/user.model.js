const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add username'],
    },
    password: {
        type: String,
        required: [true, 'Please add password'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserModel', UserModelSchema);
