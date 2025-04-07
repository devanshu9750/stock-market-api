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
        if (!this.socket) {
            this.socket = getSmartApiWebSocket()
        }
        await this.socket.connect()
    }

    receiveTick(data) {
        if (data.last_traded_price) {
            const stockToken = parseInt(data.token.replace("'", "").replace('"', ""));
            const socketIO = getStockSocket();
            data = { token: stockToken, last_traded_price: data.last_traded_price }
            socketIO.to(stockToken).emit("data", JSON.stringify(data));
        }
    }

    subscribe(stockTokens) {
        if (stockTokens) {
            let json_req = {
                action: 1,
                mode: 1,
                exchangeType: 1,
                tokens: stockTokens,
            };

            this.socket.fetchData(json_req);
        }
    }

    unsubscribe(stockTokens) {
        if (stockTokens) {
            let json_req = {
                action: 0,
                mode: 1,
                exchangeType: 1,
                tokens: stockTokens,
            };

            this.socket.fetchData(json_req);
        }
    }
}

module.exports = new SmartApiSocketService()