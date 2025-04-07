const otpService = require('../services/otp.service');
const userService = require('../services/user.service');
const jwtUtil = require('../utils/jwt.util');

const authController = {
    generateOTP: async (req, res) => {
        let { mobileNumber } = req.body;
        if (!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        // Check if mobile number is valid
        const isValidMobileNumber = /^[0-9]{10}$/.test(mobileNumber);
        if (!isValidMobileNumber) {
            return res.status(400).json({ message: 'Invalid mobile number' });
        }

        let otp = otpService.generateOTP(mobileNumber);
        return res.status(200).json({ otp });
    },

    verifyOTP: async (req, res, next) => {
        try {
            // Verify OTP
            let { mobileNumber, otp } = req.body;

            if (!mobileNumber || !otp) {
                return res.status(400).json({ message: 'Mobile number and OTP are required' });
            }

            const isValid = await otpService.verifyOTP(mobileNumber, otp);
            if (!isValid) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            // Find user by mobile number
            let user = await userService.getUserByMobileNumber(mobileNumber);

            if (!user) {
                user = await userService.createUser(mobileNumber);
            }

            // Generate access token and refresh token
            const accessToken = jwtUtil.generateAccessToken(user);
            const refreshToken = jwtUtil.generateRefreshToken(user);

            return res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            next(error);
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }

            const decodedToken = jwtUtil.decodeRefreshToken(refreshToken);
            if (!decodedToken) {
                return res.status(400).json({ message: 'Invalid refresh token' });
            }

            const user = await userService.getUserById(decodedToken.id);
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const accessToken = jwtUtil.generateAccessToken(user);
            return res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = authController;