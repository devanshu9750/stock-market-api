const { getSmartApiWebSocket } = require('../config/smartapi')

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
        console.log(data);
    }

    subscribe(tokens) {
        if (tokens) {
            let json_req = {
                action: 1,
                mode: 1,
                exchangeType: 1,
                tokens: tokens,
            };

            this.socket.fetchData(json_req);
        }
    }

    unsubscribe() {
        if (tokens) {
            let json_req = {
                action: 0,
                mode: 1,
                exchangeType: 1,
                tokens: tokens,
            };

            this.socket.fetchData(json_req);
        }
    }
}

module.exports = new SmartApiSocketService()