const { getRedisClient } = require('../config/redis');
const crypto = require('crypto');

const otpService = {
    generateOTP: (mobileNumber) => {
        let otp = crypto.randomInt(100000, 1000000).toString();
        let client = getRedisClient();
        client.set(`otp:${mobileNumber}`, otp, { EX: 60 });
        return otp;
    },

    verifyOTP: async (mobileNumber, otp) => {
        let client = getRedisClient();
        let storedOTP = await client.get(`otp:${mobileNumber}`);
        return storedOTP === otp;
    }
};

module.exports = otpService;