const Watchlist = require("../models/watchlist");

const watchlistService = {
    getWatchlistByUserId: async (userId) => {
        try {
            let watchlist = await Watchlist.findOne({ userId }).select("stockTokens");
            return watchlist?.stockTokens || [];
        } catch (error) { throw new Error(error); }
    },

    addStocksToWatchlist: async (userId, stockTokens) => {
        try {
            const updatedWatchlist = await Watchlist.findOneAndUpdate(
                { userId },
                { $addToSet: { stockTokens: { $each: stockTokens } } },
                { upsert: true, new: true }
            ).select("stockTokens");
            return updatedWatchlist.stockTokens;
        } catch (error) { throw new Error(error); }
    },

    removeStocksFromWatchlist: async (userId, stockTokens) => {
        try {
            const updatedWatchlist = await Watchlist.findOneAndUpdate(
                { userId },
                { $pullAll: { stockTokens } },
                { new: true }
            ).select("stockTokens");
            return updatedWatchlist.stockTokens;
        } catch (error) { throw new Error(error); }
    }
};

module.exports = watchlistService;