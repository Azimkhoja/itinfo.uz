
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index.routes");
const cookieParser = require('cookie-parser')
const ErrorHandler = require('./middleware/errorHandlingMiddleware')
const config = require('config')
const winston = require('winston')
const expressWinston = require('express-winston')
// require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})
// process.on("uncaughtException", (ex) => {
//   console.log(ex.message);
//   process.exit(1)
// })

// console.log(process.env.NODE_ENV);

const logger = require('./services/logger');
const {handler} = require("./helpers/requestHandler");
const expHbs = require('express-handlebars')
const PORT = config.get("port") || 3002;
const app = express();

app.use(express.json());  // frontenddan kelayotgan json so'rovlarini taniydi
app.use(cookieParser())
const hbs = expHbs.create({
  defaultLayout: "main",
  extname: "hbs",
})
app.engine("hbs", hbs.engine)
app.set("View engine", "hbs")
app.set("views", "views")
app.use(express.static("views"))

// app.use(handler)  
app.use(routes)

// #ErrorHandler eng oxirida ishlaydi ishlaydi
  app.use(ErrorHandler)

  run();
  async function run() {
    try {
      await mongoose.connect("mongodb://localhost:27017/itinfo");
      app.listen(PORT, () => {
      console.log(`server connected.. http://localhost:${PORT}`);
    });
  } catch (error) { 
    console.log(error);
  }
}
