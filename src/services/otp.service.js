const { getRedisClient } = require('../config/redis');
const crypto = require('crypto');

const otpService = {
    generateOTP: (mobileNumber) => {
        try {
            let otp = crypto.randomInt(100000, 1000000).toString();
            let client = getRedisClient();
            client.set(`otp:${mobileNumber}`, otp, { EX: 60 });
            return otp;
        } catch (error) { throw new Error(error); }
    },

    verifyOTP: async (mobileNumber, otp) => {
        try {
            let client = getRedisClient();
            let storedOTP = await client.get(`otp:${mobileNumber}`);
            return storedOTP === otp;
        } catch (error) { throw new Error(error); }
    }
};

module.exports = otpService;