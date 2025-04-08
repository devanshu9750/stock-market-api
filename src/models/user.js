const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: { type: String, required: true },
    name: { type: String, required: false, default: 'Guest' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    balance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);