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

transactionSchema.pre('deleteOne', function (next) {
    const err = new Error('Delete operation is not allowed on transaction.');
    next(err);
});

transactionSchema.pre('deleteMany', function (next) {
    const err = new Error('Delete operation is not allowed on transaction.');
    next(err);
});

transactionSchema.pre('remove', function (next) {
    const err = new Error('Remove operation is not allowed on transaction.');
    next(err);
});

module.exports = mongoose.model("Transaction", transactionSchema);
