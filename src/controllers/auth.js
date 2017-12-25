'use strict';


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const db = require('../db');
const presenter = require('../presenters/responsePresenter');
const passwordService = require('../services/passwordService');
const {secret} = require('../resources/jwtSecret');


passport.use(new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },
  (login, password, callback) => {
    db.user.getUserByLogin(login)
      .then((user) => {
        if (!user) {
          return callback(null, false);
        }

        passwordService.verifyPassword(password, user.password, (err, isMatch) => {
          if (err) {
            return callback(err);
          }
          if (!isMatch) {
            return callback(null, false);
          }
          return callback(null, user);
        });
      })
      .catch((err) => callback(err));
  })
);


passport.use(new BearerStrategy(
  (token, cb) => {
    return db.user.getUserByToken(token)
      .then(user => {
        if (!user) {
          return cb(null, false);
        }
        return cb(null, user);
      })
      .catch(err => {
        return cb(new Error(`Error occurred while finding user with token ${token}: ${err}`))
      });
  }));


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});


passport.deserializeUser((id, cb) => {
  db.user.getUserById(userId)
    .then((user) => {
      if (user) {
        return cb(null, user);
      }
      return cb(new Error(`User with id ${id} is not found`));
    });
});


module.exports.passport = passport;
module.exports.loginUser = passport.authenticate('local', {session: false});
module.exports.isAuth = passport.authenticate('bearer', {session: false});

module.exports.generateToken = (req, res, next) => {
  let userId = req.user.id;
  const token = jwt.sign({id: userId}, secret);
  db.user.getUserById(userId)
    .then((user) => {
      if (user) {
        return db.user.addToken(token, userId)
      }
      throw new Error(`User with id ${userId} is not found`);
    })
    .then(() => {
      req.user.token = token;
      res.header('Authorization', `Bearer ${token}`);
      res.json(presenter.success({
        user: req.user
      }));
    })
    .catch((err) => next(err));
};

module.exports.logout = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  db.user.removeToken(token)
    .then(() => {
      res.header('Authorization', '');
      res.json(presenter.success(null));
    })
    .catch((err) => next(err));
};