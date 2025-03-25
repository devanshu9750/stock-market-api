const User = require('../models/user');

const userService = {
    getUserByMobileNumber: async (mobileNumber) => await User.findOne({ mobileNumber }),
    getUserById: async (id) => await User.findById(id),
    createUser: async (mobileNumber) => await User.create({ mobileNumber, name: 'Guest' })
}

module.exports = userService;