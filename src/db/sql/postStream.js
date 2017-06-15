const getPostStream = (limit, offset) => (
    'select ' +
      '"user".name, "user".avatar, ' +
      'post.id, post.user_id, post.title, post.content, post.created, post.updated, post.likes ' +
    'from post ' +
    'join "user" ' +
      'on post.user_id = "user".id ' +
    `limit ${limit} offset ${offset}`
);

module.exports = {getPostStream};