const Comment = require('./comment.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const Product = require('../products/product.model');

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
    await Comment.paginate({ ...query, reply_to: null }, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const comments = await Comment.populate(result.docs, [
            { path: 'created_by' },
            { path: 'product_id' },
            { path: 'reply_to' }
          ]);
          success
            .addField('data', comments)
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
    const comment = await Comment.findById(req.params.id).populate([
      { path: 'created_by' },
      { path: 'product_id' },
      { path: 'reply_to' }
    ]);

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
    // const parent_comment = await Comment.findById(req.body.reply_to);
    // if (!parent_comment) {
    //   throw new Error({
    //     statusCode: 404,
    //     message: 'comment.notFound',
    //     messages: { comment: 'comment not found' },
    //   });
    // }
    const product = await Product.findById(req.body.product_id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        messages: { product: 'product not found' },
      });
    }
    product.comments_count++;
    const comments = await Comment.find({ product_id: req.body.product_id });
    product.rating = (comments.map(item => item.rating) + req.body.rating) / (comments.length + 1);
    await Product.findByIdAndUpdate(req.body.product_id, product);
    const comment = new Comment(req.body);
    comment.created_by = req.user._id;
    const result = await comment.save();
    const notification = new Notification({
      user_id: req.user._id,
      type: 'comment_add',
      title: 'Bình luận mới',
      message: `Khách hàng ${req.user.full_name} vừa viết bình luận cho sản phẩm ${product.name}.`,
      object_id: comment._id,
      onModel: 'Comment',
      for: 'staff'
    });
    const createdNotification = await notification.save();
    req.io.emit('staff_notification', createdNotification);
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
    comment.updated_at = Date.now();
    await Comment.findByIdAndUpdate(req.params.id, comment);
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
