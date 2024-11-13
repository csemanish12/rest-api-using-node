const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
// Use Morgan to log requests, passing logs to Winston
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim()) // Pass logs to Winston
        }
    })
);


app.use(bodyParser.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', userRoutes);


// global error handler
app.use((err, req, res, next) => {
    console.log("Found in globar error handler")
    logger.error(`Error: ${err.message}, Stack: ${err.stack}`);
    res.status(500).json({ message: 'Internal server error' });
});



module.exports = app;