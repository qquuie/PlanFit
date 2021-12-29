var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var inforRouter = require('./routes/inforRoute');
var contactRouter = require('./routes/contactRoute');
var workoutRouter = require('./routes/workoutRoute');
var navigationRouter = require('./routes/navigationRoute');
var aboutRouter = require('./routes/aboutRoute');


//In app.js
mongoose.connect("mongodb://127.0.0.1:3000/");
app.use(require("express-session")({
secret:"Any normal Word",//decode or encode session
    resave: false,          
    saveUninitialized:false    
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/contact', contactRouter);
app.use('/infor',inforRouter)
app.use('/workout',workoutRouter)
app.use('/navi',navigationRouter)
app.use('/about',aboutRouter)


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
