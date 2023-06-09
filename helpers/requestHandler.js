const express = require('express')
const expressWinston = require('express-winston')
const winston = require('winston')
require('winston-mongodb')

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, lavel,prettyPrint, metadata} = format;


const handler = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new transports.MongoDB({
        db: "mongodb://localhost:27017/itinfo",
        options: {useUnifiedTopology: true},
    })],
    format: winston.format.combine(metadata(), prettyPrint(), winston.format.json()
      ),
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    })

const winston_err_handler = expressWinston.logger({
    transports: [
        new transports.Console()],
    format: combine(prettyPrint())
})
    module.exports = {
        handler,
        winston_err_handler
    }