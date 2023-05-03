require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

require('./config/dbConfig');

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
