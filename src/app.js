const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(logger);
app.use(bodyParser.json());
app.use('/auth', authRoutes);

module.exports = app;