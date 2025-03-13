const express       = require('express');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const cors          = require('cors');

const bodyParser = require('body-parser');
const createError   = require('http-errors');
const path          = require('path');

const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const catwaysRouter   = require('./routes/catways');
const mongodb      = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);

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
