var createError = require('http-errors');
var express = require('express');
//var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mastersRouter = require('./routes/masterApi')
var cors = require('cors')
var app = express();

//app.use(cors())
// //enables cors var cors = require('cors')
 app.options('*', cors()) 
 app.use(cors())
// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.get('/', function (req, res) {

//   res.header("Access-Control-Allow-Origin", "*");
//   console.log('app get');
//   res.send('hello world 1.');
  
// })
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/masterApi', mastersRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
