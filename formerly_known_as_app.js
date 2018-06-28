var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var formerly_known_as_app = express();

// view engine setup
formerly_known_as_app.set('views', path.join(__dirname, 'views'));
formerly_known_as_app.set('view engine', 'pug');

formerly_known_as_app.use(logger('dev'));
formerly_known_as_app.use(express.json());
formerly_known_as_app.use(express.urlencoded({ extended: false }));
formerly_known_as_app.use(cookieParser());
formerly_known_as_app.use(express.static(path.join(__dirname, 'public')));

formerly_known_as_app.use('/', indexRouter);
formerly_known_as_app.use('/users', usersRouter);

// catch 404 and forward to error handler
formerly_known_as_app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
formerly_known_as_app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = formerly_known_as_app;
