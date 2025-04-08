require('dotenv').config();
const { connectDB } = require('../config/db');

connectDB().then(async () => {
    migrateUserBalance();
})

migrateUserBalance = async () => {
    const mongoose = require('mongoose');
    const session = await mongoose.startSession();
    const User = require('../models/user');

    try {
        session.startTransaction();

        await User.updateMany(
            { balance: { $exists: false } },
            { $set: { balance: 0 } },
            { session }
        );

        await session.commitTransaction();
        console.log("Balance update committed successfully.");
    } catch (err) {
        await session.abortTransaction();
        console.error("Transaction aborted due to error:", err);
    } finally {
        session.endSession();
        mongoose.connection.close();
    }
}
