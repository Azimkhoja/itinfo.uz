// const winston = require('winston')
const config = require('config')
require('winston-mongodb')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, lavel, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

let logger 
const devLog= createLogger({
    format: combine(timestamp(), myFormat),
    transports:[
        new transports.Console({level: "debug"}),
        new transports.File({filename: "error.log", level: "error"}),
        new transports.File({filename: "log/combine.log", level: "info"}),

    ],exceptionHandlers:[new transports.File({filename: "log/exeptions.log"}), new transports.Console()],
    rejectionHandlers: [new transports.File({filename: "log/rejections.log"})]
})

const prodLog = createLogger({
    format: combine(timestamp(), myFormat),
    transports:[
        new transports.Console({level: "debug"}),
        new transports.File({filename: "error.log", level: "error"}),

    ],exceptionHandlers:[new transports.File({filename: "log/exeptions.log"}), new transports.Console()],
    rejectionHandlers: [new transports.File({filename: "log/rejections.log"})]
})
if(process.env.NODE_ENV == "poduction"){
    logger = prodLog
}
else dlogger = devLog

module.exports = logger