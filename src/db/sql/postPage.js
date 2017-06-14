const getPost = (postId) => (
  'select ' +
  '"user".name, "user".avatar, ' +
  'post.id, post.user_id, post.title, post.content, post.created, post.updated, post.likes ' +
  'from post ' +
  'join "user" ' +
  'on post.user_id = "user".id ' +
  `where post.id = ${postId};`
);


const getPostComments = (postId) => (
    'select ' +
      'comment.id, comment.post_id, comment.content, comment.content, comment.created, comment.updated, comment.likes, ' +
      '"user".id as user_id, "user".name, "user".avatar ' +
    'from comment ' +
    'join "user" ' +
    'on comment.user_id = "user".id ' +
    `where comment.post_id = ${postId};`
);

module.exports = {getPost, getPostComments};