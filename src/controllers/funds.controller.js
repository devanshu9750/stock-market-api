const transactionService = require('../services/transaction.service');

const fundsController = {
    addFunds: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { amount } = req.body;

            if (!amount) {
                return res.fail('Amount is required', 400);
            }

            const updatedBalance = await transactionService.addFunds(userId, amount);

            res.success({ balance: updatedBalance });
        } catch (error) {
            next(error);
        }
    },

    withdrawFunds: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { amount } = req.body;

            if (!amount) {
                return res.fail('Amount is required', 400);
            }

            const updatedBalance = await transactionService.withdrawFunds(userId, amount);

            res.success({ balance: updatedBalance });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = fundsController