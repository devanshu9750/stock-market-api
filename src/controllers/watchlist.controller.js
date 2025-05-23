const watchlistService = require("../services/watchlist.service");

const watchlistController = {
    getWatchlistOfUser: async (req, res, next) => {
        try {
            let userWatchlist = await watchlistService.getWatchlistByUserId(req.user.id)
            return res.success({ watchlist: userWatchlist });
        } catch (error) {
            next(error);
        }
    },

    addStocksToWatchlist: async (req, res, next) => {
        try {
            let updatedWatchlist = await watchlistService.addStocksToWatchlist(req.user.id, req.body.stockTokens);
            return res.success({ watchlist: updatedWatchlist });
        } catch (error) {
            next(error);
        }
    },

    removeStocksFromWatchlist: async (req, res, next) => {
        try {
            let updatedWatchlist = await watchlistService.removeStocksFromWatchlist(req.user.id, req.body.stockTokens);
            return res.success({ watchlist: updatedWatchlist });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = watchlistController;