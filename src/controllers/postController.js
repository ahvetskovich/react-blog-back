const util = require('util');
const postService = require('../services/postService');
const {DEFAULT_POST_PAGE_LIMIT, DEFAULT_POST_PAGE_OFFSET} = require('../resources/postConstants');
const presenter = require('../presenters/responsePresenter');

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
      .catch(err => {
        console.log(err);
        res.json(presenter.fail(err, 'Error occurred while getting post page'));
      });
  });
}

const getPostStream = (req, res, next) => {
  req.checkQuery('limit', 'Limit should be an integer').isInt();
  req.checkQuery('offset', 'Offset should be an integer').isInt();
  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      res.status(400).send('There are validation errors: ' + util.inspect(result.array()));
      return;
    }
    const limit = req.query.limit || DEFAULT_POST_PAGE_LIMIT;
    const offset = req.query.offset || DEFAULT_POST_PAGE_OFFSET;
    postService.getPostStream(limit, offset)
      .then(posts => {
        res.status(200)
          .json({
            status: 'success',
            data: posts
          });
      })
      .catch(err => {
        console.log(err);
        res.json(presenter.fail(err, 'Error occurred while getting post stream'));
      });
  });
};

module.exports = {getPostPage, getPostStream};