const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getOrdersValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      select: Joi.string().optional(),
      limit: Joi.number().optional(),
      page: Joi.number().optional(),
      sort: Joi.string().optional(),
      status: Joi.string()
        .optional()
        .valid(
          'handling',
          'picking',
          'delivering',
          'delivered',
          'completed',
          'user_cancel',
          'shop_cancel',
          'lost_damage'
        ),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrderValidator = async (req, res, next) => {
  try {
    const itemSchema = Joi.object().keys({
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      product_id: Joi.string().required(),
      size: Joi.number().required(),
    });
    const paymentSchema = Joi.object().keys({
      paymentMethod: Joi.string().required(),
      bank_account: Joi.when('paymentMethod', {
        is: 'cash',
        then: Joi.string().forbidden(),
        otherwise: Joi.string().required(),
      }),
    });
    const schema = Joi.object().keys({
      order_items: Joi.array().required().items(itemSchema),
      shipping: Joi.string().required(),
      items_price: Joi.number().required(),
      tax_price: Joi.number().required(),
      shipping_price: Joi.number().required(),
      total_price: Joi.number().required(),
      is_paid: Joi.boolean().optional(),
      status: Joi.string()
        .optional()
        .valid(
          'handling',
          'picking',
          'delivering',
          'delivered',
          'completed',
          'user_cancel',
          'shop_cancel',
          'lost_damage'
        ),
      payment: paymentSchema,
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateOrderByAdminValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string()
        .required()
        .valid(
          'picking',
          'delivering',
          'delivered',
          'shop_cancel',
          'lost_damage'
        ),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateOrderValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string().required().valid('completed', 'user_cancel'),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
