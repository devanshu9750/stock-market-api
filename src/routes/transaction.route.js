const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

const router = express.Router();

router.get('/', authMiddleware, transactionController.getAllTransactions);

module.exports = router;