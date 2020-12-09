const Comment = require('./comment.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getComments = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Comment.paginate(query, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      throw new Error({
        statusCode: 404,
        message: 'comment.notFound',
        messages: { comment: 'comment not found' },
      });
    }
    const success = new Success({ data: comment });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    comment.created_by = req.user._id;
    const result = await comment.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      throw new Error({
        statusCode: 404,
        message: 'comment.notFound',
        messages: { comment: 'comment not found' },
      });
    }
    if (comment.created_by !== req.user._id) {
      throw new Error({
        statusCode: 404,
        message: 'comment.doNotHavePermission',
        messages: { comment: 'do not have permission' },
      });
    }
    comment = { ...comment._doc, ...req.body };
    await Product.findByIdAndUpdate(req.params.id, comment);
    const success = new Success({ data: comment });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      throw new Error({
        statusCode: 404,
        message: 'comment.notFound',
        messages: { comment: 'comment not found' },
      });
    }
    if (comment.created_by !== req.user._id) {
      throw new Error({
        statusCode: 404,
        message: 'comment.doNotHavePermission',
        messages: { comment: 'do not have permission' },
      });
    }
    await Comment.findByIdAndRemove(req.params.id);
    const success = new Success({ data: comment });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const { id, state } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error({
        statusCode: 404,
        message: 'comment.notFound',
        messages: { comment: 'comment not found' },
      });
    }
    if (state === 'like') {
      comment.likes_count++;
    } else if (state === 'unlike' && comment.likes_count > 0) {
      comment.likes_count--;
    }
    await Comment.findByIdAndUpdate(id, comment);
    const success = new Success({ data: comment });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};