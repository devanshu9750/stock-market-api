const stockService = require('../services/stock.service.js');

const stockController = {
    search: async (req, res) => {
        try {
            const { text } = req.body;
            const stocks = await stockService.search(text);
            res.success({ stocks });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = stockController;