const mongoose = require("mongoose");
const User = require("../models/user");
const Transaction = require("../models/transaction");

const transactionService = {
    addFunds: async (userId, amount) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const user = await User.findById(userId).session(session);
            if (!user) throw new Error("User not found");

            await Transaction.create([{
                userId,
                amount,
                type: "add",
            }], { session });

            user.balance += amount;
            await user.save({ session });

            await session.commitTransaction();
            return user.balance || 0;
        } catch (error) {
            await session.abortTransaction();
            console.log(error);
            throw new Error("Error adding funds")
        } finally {
            session.endSession();
        }
    },

    withdrawFunds: async (userId, amount) => {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const user = await User.findById(userId).session(session);
            if (!user) throw new Error("User not found");

            if (user.balance === undefined || user.balance < amount) {
                throw new Error("Insufficient balance");
            }

            await Transaction.create([{
                userId,
                amount,
                type: "withdraw",
            }], { session });

            user.balance -= amount;
            await user.save({ session });

            await session.commitTransaction();
            return user.balance || 0;
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new Error(error.message || "Error withdrawing funds");
        } finally {
            session.endSession();
        }
    },

    getTransactions: async (userId) => {
        try {
            const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
            return transactions || [];
        } catch (error) { throw new Error("Error fetching transactions") }
    },
}

module.exports = transactionService;