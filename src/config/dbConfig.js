const mongoose = require('mongoose');

const dbConfig = secrets.DB_URL;

const connection = mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
