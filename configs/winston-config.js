const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A',
    }),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: './logs/error/error.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 30,
      tailable: true,
      zippedArchive: true,
    }),
    new winston.transports.File({
      level: 'info',
      filename: './logs/info/info.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 10,
      tailable: true,
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.simple(),
      ),
    }),
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
