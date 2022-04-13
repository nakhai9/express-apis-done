const winston = require("winston");
const path = require("path");

const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

const loggerFormats = winston.format.combine(
  winston.format.timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  //     winston.format.colorize(),
  winston.format.printf(
    (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
  )
);

const logger = winston.createLogger({
  format: loggerFormats,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, "../log/user.log"),
    }),
  ],
});

module.exports = logger;
