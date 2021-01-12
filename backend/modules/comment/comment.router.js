const express = require('express');
const controller = require('./comment.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./comment.validation');

router.get('/', validator.getCommentsValidator, controller.getComments);
router.get('/:id', controller.getCommentById);
router.post(
  '/',
  isAuth,
  validator.createCommentValidator,
  controller.createComment
);
router.put(
  '/:id',
  isAuth,
  validator.updateCommentValidator,
  controller.updateComment
);
router.put(
  '/like-comment',
  isAuth,
  validator.likeCommentValidator,
  controller.likeComment
);

router.use(handleError);
module.exports = router;
