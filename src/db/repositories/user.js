const sql = require('../sql/user');

class User {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  getUserById(userId) {
    return this.db.oneOrNone(sql.getUserById(userId));
  }

  getUserByLogin(login) {
    return this.db.oneOrNone(sql.getUserByLogin(login));
  }

  getUserByToken(token) {
    return this.db.oneOrNone(sql.getUserByToken(token));
  }

  createUser(login, password, name, avatar) {
    return this.db.none(sql.createUser(login, password, name, avatar));
  }

  addToken(token, userId) {
    return this.db.none(sql.addToken(token, userId));
  }

  removeToken(token) {
    return this.db.none(sql.removeToken(token));
  }
}

module.exports = User;



