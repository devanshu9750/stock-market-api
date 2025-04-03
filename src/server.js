require('dotenv').config();
const http = require('http');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');
const { connectSmartApi } = require('./config/smartapi');
const { setupSocketIO } = require('./config/socketio')
const { setupStockSocket } = require('./sockets/stock.socket')
const smartApiSocketService = require('./services/smartapi.socket.service');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

setupSocketIO(server)

let failureCounter = 0;
const maxFailures = 5;

const init = async () => {
    try {
        await connectDB();
        await connectRedis();
        await connectSmartApi();
        await smartApiSocketService.setup();
        setupStockSocket();
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        failureCounter++;
        if (failureCounter >= maxFailures) {
            console.error('Max failures reached. Exiting...');
            process.exit(1);
        }
        setTimeout(init, 2000);
    }
}

init();

