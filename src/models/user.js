const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: { type: String, required: true },
    name: { type: String, required: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);