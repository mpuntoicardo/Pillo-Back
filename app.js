const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes');
const postalCodeRoutes = require('./Routes/postalCodeRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');

/**
 * Initial setup of app, mainly found in express documentation
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/user', userRoutes);
app.use('/postalCode', postalCodeRoutes);
app.use('/category', categoryRoutes);

module.exports = app;