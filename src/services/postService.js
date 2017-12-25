const db = require('../db');

const getPostStream = (limit, offset) => {
  return db.postStream.getPostStream(limit, offset)
    .then(data =>
      data.map(({user_id, avatar, name, ...result}) => (
        {
          ...result,
          author: {
            avatar: avatar,
            name: name,
            id: user_id
          }
        }
      ))
    );
};

const getPostPage = postId => {
  const promises = [
    db.postPage.getPost(postId),
    db.postPage.getPostComments(postId)
  ];
  return Promise.all(promises)
    .then(rawPostWithComments => {
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
};

module.exports = {
  getPostStream,
  getPostPage,
};
