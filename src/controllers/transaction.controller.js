const transactionService = require('../services/transaction.service');

const transactionController = {
    getAllTransactions: async (req, res) => {
        try {
            const page = req.query.page || 0;
            const transactions = await transactionService.getTransactions(req.user.id, page);
            res.success(transactions);
        } catch (error) {
            res.fail(error.message, 500);
        }
    }
}

module.exports = transactionController;