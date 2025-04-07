const Stock = require('../models/stock')

const stockSyncJob = async () => {
    try {
        const response = await fetch(process.env.STOCK_MASTER_URL)
        const allStocks = await response.json()
        const filteredStocks = allStocks.filter(stock => {
            return stock.expiry == ""
                && stock.instrumenttype == ""
                && stock.exch_seg == "NSE"
                && stock.symbol.includes("EQ")
        })

        let operations = []

        for (const stock of filteredStocks) {
            operations.push({
                updateOne: {
                    filter: { token: stock.token },
                    update: {
                        token: stock.token,
                        symbol: stock.symbol,
                        name: stock.name
                    },
                    upsert: true
                }
            })
        }

        await Stock.bulkWrite(operations)
        console.log("✅ Stock Data Synced Successfully")
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

module.exports = { stockSyncJob }