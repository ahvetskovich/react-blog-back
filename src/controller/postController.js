const util = require('util');
const postService = require('../service/postService');

function getPostPage(req, res, next) {
  req.checkParams('postId', 'Should be an integer').notEmpty().isInt();
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    const postId = req.params.postId;
    postService.getPostPage(postId)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data
          });
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

function getPostStream(req, res, next) {
  req.checkQuery('limit', 'Limit should be an integer').isInt();
  req.checkQuery('offset', 'Offset should be an integer').isInt();
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;
    postService.getPostStream(limit, offset)
      .then(function (posts) {
        res.status(200)
          .json({
            status: 'success',
            data: posts
          });
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

module.exports = {getPostPage, getPostStream};