require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const responseMiddleware = require('./middlewares/response.middleware');
const routes = require('./routes/index.route');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(responseMiddleware);

// API Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

module.exports = app;
