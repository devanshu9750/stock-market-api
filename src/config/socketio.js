const { Server } = require("socket.io");
const { decodeAccessToken } = require('../utils/jwt.util')

let socketIO = null

const setupSocketIO = (server) => {
    socketIO = new Server(server);

    socketIO.use((socket, next) => {
        const bearerToken = socket.request.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer')) return next(new Error("Unauthorized"));

        const token = bearerToken.split(' ')[1]
        try {
            const decoded = decodeAccessToken(token);
            if (!decoded) {
                next(new Error("Invalid Token"));
            } else {
                socket.user = decoded;
                next();
            }
        } catch (err) {
            next(new Error("Invalid Token"));
        }
    });
}

const getSocketIO = () => socketIO;

module.exports = { setupSocketIO, getSocketIO }