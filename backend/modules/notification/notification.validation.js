const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getNotificationsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      select: Joi.string().optional(),
      limit: Joi.number().optional(),
      page: Joi.number().optional(),
      sort: Joi.string().optional(),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.createNotificationValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      type: Joi.string().required().valid('order_add', 'order_update_paid', 'order_update_delivered', 'comment_add', 'cart_add', 'auth_reset_password', 'product_add', 'staff_add', 'stock_update', 'user_change_password', 'category_add', 'admin_add'),
      onModel: Joi.string().required().valid('Order', 'Comment', 'Product', 'Cart', 'User', 'Stock', 'Category'),
      object_id: Joi.string().required(),
      title: Joi.string().required(),
      message: Joi.string().required(),
      for: Joi.string().required().valid('customer', 'staff', 'admin'),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};