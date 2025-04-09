const { getRedisClient } = require("../config/redis");
const Watchlist = require("../models/watchlist");
const mongoose = require("mongoose");

const watchlistService = {
    getWatchlistByUserId: async (userId, onlyTokens = false) => {
        try {
            if (onlyTokens === true) {
                let userWatchlist = await Watchlist.findOne({ userId }).select("stockTokens")
                return userWatchlist?.stockTokens || [];
            }

            const redisClient = getRedisClient()

            const value = await redisClient.get(`watchlist:${userId}`)
            if (value) return JSON.parse(value)

            let result = await Watchlist.aggregate([
                { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },
                { $limit: 1 },
                {
                    $lookup: {
                        from: "stocks",
                        localField: "stockTokens",
                        foreignField: "token",
                        as: "watchlist",
                        pipeline: [{
                            $project: { token: 1, name: 1, symbol: 1 }
                        }]
                    }
                },
                {
                    $addFields: {
                        watchlist: {
                            $map: {
                                input: "$stockTokens",
                                as: "token",
                                in: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$watchlist",
                                                as: "stock",
                                                cond: { $eq: ["$$stock.token", "$$token"] }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            ])

            if (result && Array.isArray(result) && result.length > 0) {
                redisClient.set(`watchlist:${userId}`, JSON.stringify(result[0].watchlist), { EX: 300 })
                return result[0].watchlist;
            }

            return [];
        } catch (error) { throw new Error(error); }
    },

    addStocksToWatchlist: async function (userId, stockTokens) {
        try {
            await Watchlist.findOneAndUpdate(
                { userId },
                { $addToSet: { stockTokens: { $each: stockTokens } } },
                { upsert: true }
            );

            const redisClient = getRedisClient()
            await redisClient.del(`watchlist:${userId}`)

            return await this.getWatchlistByUserId(userId);
        } catch (error) { throw new Error(error); }
    },

    removeStocksFromWatchlist: async function (userId, stockTokens) {
        try {
            await Watchlist.findOneAndUpdate(
                { userId },
                { $pullAll: { stockTokens } },
            );

            const redisClient = getRedisClient()
            await redisClient.del(`watchlist:${userId}`)

            return await this.getWatchlistByUserId(userId);
        } catch (error) { throw new Error(error); }
    }
};

module.exports = watchlistService;