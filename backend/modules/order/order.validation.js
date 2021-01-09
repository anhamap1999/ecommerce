const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getOrdersValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      product_id: Joi.string().optional(),
      rating: Joi.number().optional().valid(1, 2, 3 ,4 , 5),
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

exports.createOrderValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      content: Joi.string().required(),
      rating: Joi.number().required(),
      product_id: Joi.string().required(),
      images: Joi.array().optional().items(Joi.string()),
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
      status: Joi.string().required().valid('paid', 'delivered'),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
