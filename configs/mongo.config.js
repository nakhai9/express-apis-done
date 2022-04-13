const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./logger.config");
dotenv.config();

const uri = "mongodb://127.0.0.1:27017/myapis";

const connect = mongoose.connect(uri, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log("Connected failed.");
  } else {
    console.log("Database connected.");
    logger.info("Database connected.");
  }
});

module.exports = connect;
