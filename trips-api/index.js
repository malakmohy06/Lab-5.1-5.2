const express = require('express');
const tripRoutes = require('./routes/tripRoutes');
const app = express();

app.use(express.json());
app.use('/trips', tripRoutes);
app.use('/api/v1/trips', tripRoutes);

module.exports = app;
