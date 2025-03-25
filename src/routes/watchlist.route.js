const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const watchlistController = require('../controllers/watchlist.controller');

const router = express.Router();

// Define your routes here
router.get('/', authMiddleware, watchlistController.getWatchlistOfUser);
router.post('/', authMiddleware, watchlistController.addStocksToWatchlist);
router.delete('/', authMiddleware, watchlistController.removeStocksFromWatchlist);

module.exports = router;