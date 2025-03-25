const jwt = require('jsonwebtoken');

const jwtUtil = {
    generateAccessToken: (user) => {
        return jwt.sign({ id: user._id, mo_number: user.mo_number }, process.env.JWT_ACCESS_TOKEN_SECRET || 'secret', { expiresIn: '1h' });
    },

    generateRefreshToken: (user) => {
        return jwt.sign({ id: user._id, mo_number: user.mo_number }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    },

    decodeAccessToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        } catch (_) {
            return null;
        }
    },

    decodeRefreshToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        } catch (_) {
            return null;
        }
    }
}

module.exports = jwtUtil;