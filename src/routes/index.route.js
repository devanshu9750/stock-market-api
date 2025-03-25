const express = require('express');
const auth = require('./auth.route');

const router = express.Router();

// Default route
router.get('/', (_, res) => {
    res.status(200).json({ data: 'Welcome to the Stock Market API' });
});

router.use('/auth', auth);

module.exports = router;