const transactionService = require('../services/transaction.service');

const fundsController = {
    addFunds: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { amount } = req.body;

            if (!amount) {
                return res.status(400).json({ message: 'Amount is required' });
            }

            const updatedBalance = await transactionService.addFunds(userId, amount);

            res.status(200).json({ data: { balance: updatedBalance } });
        } catch (error) {
            next(error);
        }
    },

    withdrawFunds: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { amount } = req.body;

            if (!amount) {
                return res.status(400).json({ message: 'Amount is required' });
            }

            const updatedBalance = await transactionService.withdrawFunds(userId, amount);

            res.status(200).json({ data: { balance: updatedBalance } });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = fundsController