const mongoose = require("mongoose");

const dbConfig = process.env.DB_URL || ${{ secrets.DB_URL }};

const connection = mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'notes'
  })
  .then(() => console.log("database conected"));

module.exports = connection;
