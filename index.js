require("dotenv").config();
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const express = require("express");

const connect = require("./configs/mongo.config");

const app = express();

const indexRouter = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options("*", cors());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT} & connected to database.`);
});

module.exports = app;
