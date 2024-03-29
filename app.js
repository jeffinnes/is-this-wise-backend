const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./configs/winston-config');

// As I understand it on 3/18/2021
// This works just by including the require. We don't actually have to use the const.
require('./configs/passport-setup');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    secret: process.env.cookieSessionSecret,
  }),
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(process.env.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connection to MongoDB established...');
  })
  .catch((error) => {
    logger.error(error);
  });

const corsOption = {
  origin: 'https://is-this-wise.innesapps.net',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOption));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
