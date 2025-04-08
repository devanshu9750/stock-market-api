const express = require('express');
const stockController = require('../controllers/stock.controller');

const router = express.Router();

router.post('/search', stockController.search);

module.exports = router;