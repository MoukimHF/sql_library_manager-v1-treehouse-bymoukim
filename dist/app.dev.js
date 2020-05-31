"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var routes = require('./routes/index');

var books = require('./routes/books');

var app = express();

var Book = require('./models').Book; // // view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/books', books); // catch 404 and forward to error handler
// app.use( (req, res, next) => {
//   next(createError(404));
// });
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;