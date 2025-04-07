const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Stock', stockSchema);