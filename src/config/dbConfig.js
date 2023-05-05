const mongoose = require("mongoose");

const dbConfig = process.env.DB_URL;
console.log(process.env.DB_URL);

const connection = mongoose
  .connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database conected"));

module.exports = connection;
