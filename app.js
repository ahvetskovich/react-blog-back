const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const postRouter = require('./src/routers/postRouter');
const authRouter = require('./src/routers/authRouter');

const expressValidator = require('express-validator');
const passport = require('./src/controllers/auth').passport;
const errorHandlers = require('./src/controllers/error');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator([]));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// for CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', authRouter);
app.use('/', postRouter);

app.use('*', errorHandlers.notFoundHandler);
app.use(errorHandlers.unauthHandler);

module.exports = app;
