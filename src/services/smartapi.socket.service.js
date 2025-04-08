const { getSmartApiWebSocket } = require('../config/smartapi')
const { getStockSocket } = require('../config/socketio')

class SmartApiSocketService {
    constructor() {
        this.socket = getSmartApiWebSocket()
    }

    async setup() {
        await this.connect()
        this.socket.on('tick', this.receiveTick);
    }

    async connect() {
        if (!this.socket) this.socket = getSmartApiWebSocket()
        await this.socket.connect()
    }

    receiveTick(data) {
        if (data.last_traded_price) {
            const stockToken = parseInt(data.token.replace("'", "").replace('"', ""));
            const socketIO = getStockSocket();
            const change = (data.last_traded_price - data.close_price) / 100;
            const percentageChange = ((change / data.close_price) * 10000).toFixed(2);
            data = { token: stockToken, last_traded_price: data.last_traded_price / 100, changeValue: change, percentageChange: Math.abs(percentageChange) };
            socketIO.to(stockToken).emit("data", JSON.stringify(data));
        }
    }

    subscribe(stockTokens) {
        if (stockTokens) {
            const json_req = { action: 1, mode: 2, exchangeType: 1, tokens: stockTokens };
            this.socket.fetchData(json_req);
        }
    }

    unsubscribe(stockTokens) {
        if (stockTokens && Array.isArray(stockTokens)) {
            const socketIO = getStockSocket();
            for (const token of stockTokens) {
                if (!socketIO.adapter.rooms.get(token)) {
                    const json_req = { action: 0, mode: 2, exchangeType: 1, tokens: [token] };
                    this.socket.fetchData(json_req);
                }
            }
        }
    }
}

module.exports = new SmartApiSocketService()