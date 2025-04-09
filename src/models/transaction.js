const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    type: {
        type: String,
        enum: ["add", "withdraw"],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
