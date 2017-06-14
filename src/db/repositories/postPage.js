const sql = require('../sql/postPage');

class PostPage {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  getPost(postId) {
    return this.db.one(sql.getPost(postId));
  }

  getPostComments(postId) {
    return this.db.any(sql.getPostComments(postId));
  }

}

module.exports = PostPage;



