const otpService = require('../services/otp.service');
const userService = require('../services/user.service');
const jwtUtil = require('../utils/jwt.util');

const authController = {
    generateOTP: async (req, res) => {
        let { mobileNumber } = req.body;
        if (!mobileNumber) {
            return res.fail('Mobile number is required');
        }

        // Check if mobile number is valid
        const isValidMobileNumber = /^[0-9]{10}$/.test(mobileNumber);
        if (!isValidMobileNumber) {
            return res.fail('Invalid mobile number');
        }

        let otp = otpService.generateOTP(mobileNumber);
        return res.success({ otp })
    },

    verifyOTP: async (req, res, next) => {
        try {
            // Verify OTP
            let { mobileNumber, otp } = req.body;

            if (!mobileNumber || !otp) {
                return res.fail('Mobile number and OTP are required');
            }

            const isValid = await otpService.verifyOTP(mobileNumber, otp);
            if (!isValid) {
                return res.fail('Invalid OTP');
            }

            // Find user by mobile number
            let user = await userService.getUserByMobileNumber(mobileNumber);

            if (!user) {
                user = await userService.createUser(mobileNumber);
            }

            // Generate access token and refresh token
            const accessToken = jwtUtil.generateAccessToken(user);
            const refreshToken = jwtUtil.generateRefreshToken(user);

            return res.success({ accessToken, refreshToken });
        } catch (error) {
            next(error);
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.fail('Refresh token is required');
            }

            const decodedToken = jwtUtil.decodeRefreshToken(refreshToken);
            if (!decodedToken) {
                return res.fail('Invalid refresh token');
            }

            const user = await userService.getUserById(decodedToken.id);
            if (!user) {
                return res.fail('User not found');
            }

            const accessToken = jwtUtil.generateAccessToken(user);
            return res.success({ accessToken });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;