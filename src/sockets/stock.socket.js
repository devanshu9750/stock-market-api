const { getSocketIO } = require('../config/socketio');

const setupStockSocket = async () => {
    const io = getSocketIO()?.of("/stocks");
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Listen for messages from clients
        socket.on("message", (data) => {
            console.log(`Message from ${socket.id}: ${data}`);
            io.emit("message", data); // Broadcast message to all clients
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = { setupStockSocket }