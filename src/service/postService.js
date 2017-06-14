const db = require('../db');

function getPostStream(limit, offset) {
  return db.postStream.getPostStream(limit, offset)
    .then(function (data) {
      const posts = data.map(post => {
        const {user_id, avatar, name, ...result} = post;
        return {
          ...result,
          author: {
            avatar: avatar,
            name: name,
            id: user_id
          }
        }
      });
      return posts;
    })
    .catch(function (err) {
      return next(err);
    });
}

function getPostPage(postId) {
  const promises = [
    db.postPage.getPost(postId),
    db.postPage.getPostComments(postId)
  ];
  return Promise.all(promises)
    .then(function (rawPostWithComments) {
      const {user_id, avatar, name, ...result} = rawPostWithComments[0];
      const post = {
        ...result,
        author: {
          avatar: avatar,
          name: name,
          id: user_id
        }
      };

      const comments = rawPostWithComments[1].map(rawComment => {
        const {user_id, avatar, name, ...result} = rawComment;
        return {
          ...result,
          author: {
            avatar: avatar,
            name: name,
            id: user_id
          }
        };
      });

      return {
        post: post || {},
        comments: comments || []
      };
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getPostStream,
  getPostPage,
};
