const User = require('../models/user');

const userService = {
    getUserByMobileNumber: async (mobileNumber) => {
        try {
            return await User.findOne({ mobileNumber });
        } catch (error) { throw new Error(error); }
    },
    getUserById: async (id) => {
        try {
            return await User.findById(id)
        } catch (error) { throw new Error(error) }
    },
    createUser: async (mobileNumber) => {
        try {
            return await User.create({ mobileNumber })
        } catch (error) { throw new Error(error) }
    }
}

module.exports = userService;