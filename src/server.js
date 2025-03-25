require('dotenv').config();
const http = require('http');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');
const app = require('./app');
// const { initWebSocket } = require('./websockets');

const PORT = process.env.PORT || 3000;

// Create HTTP server and attach Express app
const server = http.createServer(app);

// Initialize WebSocket
// initWebSocket(server);

connectDB().then(async () => {
    await connectRedis();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

