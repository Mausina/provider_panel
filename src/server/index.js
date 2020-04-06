const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
let createError = require("http-errors");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let fs = require("fs");
const errorHandler = require("./_helpers/error-handler");
const {CustomerNotFoundError} = require("./_helpers/CustomerNotFoundError");
const cors = require("cors");

let routes = require("./routers");

const app = express();

let passport   = require("passport");
let session    = require("express-session");


// log all requests to access.log
app.use(logger("common", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" })
}));

app.use(session({ secret: "keyboard cat",resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cors());
//app.use(cors({
//   origin: 'https://api.zoocomplex.com.ua/'
// }));

app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(errorHandler);
app.use(CustomerNotFoundError);

module.exports = app;