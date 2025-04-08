const { getStockSocket } = require('../config/socketio');
const smartApiSocketService = require('../services/smartapi.socket.service');

const setupStockSocket = async () => {
    const stockSocket = getStockSocket();
    stockSocket.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("subscribe", (data) => {
            console.log(`Subscribe from ${socket.id}: ${data}`);

            try {
                if (!isNaN(parseInt(data))) {
                    const stockToken = parseInt(data)
                    socket.join(stockToken)
                    smartApiSocketService.subscribe([stockToken])
                }
            } catch (error) {
                console.error("❌ Error in subscribe event:", error);
            }
        });

        socket.on("unsubscribe", (data) => {
            console.log(`Unsubscribe from ${socket.id}: ${data}`);

            try {
                if (!isNaN(parseInt(data))) {
                    const stockToken = parseInt(data)
                    socket.leave(stockToken)
                    smartApiSocketService.unsubscribe([stockToken])
                }
            } catch (error) {
                console.error("❌ Error in unsubscribe event:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = { setupStockSocket }