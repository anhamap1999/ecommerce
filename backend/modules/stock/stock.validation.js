const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getStocksValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      select: Joi.string().optional(),
      limit: Joi.number().optional(),
      page: Joi.number().optional(),
      sort: Joi.string().optional(),
      product_id: Joi.string().optional(),
      size: Joi.number().optional(),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};
exports.getStockByProductIdAndSizeValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
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
exports.importStockValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      stock: Joi.string().required(),
      price: Joi.number().required()
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};