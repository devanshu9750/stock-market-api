const Stock = require('../models/stock.js');

const stockService = {
    search: async (text) => {
        const stocks = await Stock.find({ name: { $regex: text, $options: 'i' } }).select('token name symbol');
        return stocks;
    }
}

module.exports = stockService;