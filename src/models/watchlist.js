const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        stockTokens: {
            type: [String],
            required: true,
            validate: {
                validator: function (value) {
                    return new Set(value).size === value.length;
                },
                message: "Stock tokens is not an array with unique elements"
            },
            default: [],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
