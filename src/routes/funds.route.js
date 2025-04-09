const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const fundsController = require('../controllers/funds.controller');

const router = express.Router();

router.post('/add', authMiddleware, fundsController.addFunds);
router.post('/withdraw', authMiddleware, fundsController.withdrawFunds);

module.exports = router;