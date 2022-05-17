const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routers
const { userRouter } = require('./routes/users.routes');
const { repairRouter } = require('./routes/repairs.routes');

// Utils
const { globalErrorHandler } = require('./controllers/errors.controller');

// Init express
const app = express();

// Enable JSON
app.use(express.json());

// Add security helmets
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming request
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

//Endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
