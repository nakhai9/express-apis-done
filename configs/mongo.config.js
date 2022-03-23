const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = "mongodb://127.0.0.1:27017/myapis";
// const uri = process.env.MONGO_URI;

const connect = mongoose.connect(uri, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log("Connected failed.");
  }
  console.log(uri);
  console.log("Database connected.");
});

module.exports = connect;
