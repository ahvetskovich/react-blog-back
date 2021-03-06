const sql = require('../sql/postStream');

class PostStream {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  getPostStream(limit, offset) {
    return this.db.any(sql.getPostStream(limit, offset));
  }
}

module.exports = PostStream;



