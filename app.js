var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入路由
var usersRouter = require('./routes/users');
var robotRouter = require('./routes/robot')//运行
var bukaRouter = require('./routes/buka')//运行
var manhuaRouter = require('./routes/manhua')//运行
var indexRouter = require('./routes/index')//运行
require('./routes/zip')//运行
var app = express();

// 选择渲染模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置路由
app.use('/users', usersRouter);
app.use('/robot', robotRouter);
app.use('/buka', bukaRouter);
app.use('/manhua', manhuaRouter);
app.use('/', indexRouter);

// 404后要做的事
app.use(function(req, res, next) {
  next(createError(404));
});

// error 后做的事
app.use(function(err, req, res, next) {
  //设置局部变量，仅在开发模式中报错
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染err页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
