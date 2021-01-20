const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.addCartValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      product_id: Joi.string().required(),
      size: Joi.number().required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateCartValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      price: Joi.number().optional(),
      quantity: Joi.number().optional(),
      size: Joi.number().optional(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
