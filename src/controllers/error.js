'use strict';

const presenter   = require('../presenters/responsePresenter');

//Passport has not authorized handler
module.exports.unauthHandler = (err, req, res, next) => {
  if (err.name === 'Unauthorized') {
    res.status(401);
    res.json(presenter.fail(null, `${err.name}: ${err.message}`));
  }
  next(err);
};


module.exports.notFoundHandler = (req, res) => {
  res.status(404);
  res.json(presenter.fail(null, 'Requested method is not found'));
};