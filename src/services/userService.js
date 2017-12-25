'use strict';

const db = require('../db');
const passwordService = require('/passwordService');
const ServiceException = require('./serviceError');

module.exports.getUserById = (userId) => (
  db.user.getUserById(userId)
);

module.exports.createUser = (login, password, name, avatar) => {
  return db.user.getUserByLogin(login)
    .then(user => {
      if (user) {
        throw new ServiceException(`User with login ${login} already exists`);
      }
      return passwordService.hashPasswordPromise(password);
    })
    .then(hashedPassword => {
      return db.user.createUser(login, hashedPassword, name, avatar);
    })
};