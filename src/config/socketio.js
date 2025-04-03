const { Server } = require("socket.io");

let socketIO = null

const setupSocketIO = (server) => {
    socketIO = new Server(server);
}

const getSocketIO = () => socketIO;

module.exports = { setupSocketIO, getSocketIO }