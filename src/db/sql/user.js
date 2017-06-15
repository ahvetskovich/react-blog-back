const getUserById = (userId) => (
  'select *' +
  'from "user" ' +
  `where id = ${userId};`
);

const getUserByLogin = (login) => (
  'select *' +
  'from "user" ' +
  `where login = '${login}';`
);

const getUserByToken = (token) => (
  'select "user".*' +
  'from "user" ' +
  'join user_token ' +
  'on "user".id = user_token.user_id ' +
  `where token = '${token}';`
);

const createUser = (login, password, name, avatar) => (
  'insert into "user"(login, password, name, avatar)' +
  `VALUES ('${login}', '${password}', '${name}', '${avatar}');`
);

const addToken = (token, userId) => (
  'insert into "user_token"(token, user_id) ' +
  `VALUES ('${token}', ${userId});`
);

const removeToken = (token) => (
  'delete from "user_token" ' +
  `where token = '${token}';`
);

module.exports = {
  getUserById,
  getUserByLogin,
  createUser,
  getUserByToken,
  addToken,
  removeToken
};