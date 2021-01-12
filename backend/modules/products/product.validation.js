const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getProductsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string()
        .optional()
        .valid('pending', 'approved', 'rejected', 'disabled'),
      category_id: Joi.string().optional(),
      color: Joi.string().optional(),
      brand: Joi.string().optional(),
      select: Joi.string().optional(),
      limit: Joi.number().optional(),
      page: Joi.number().optional(),
      sort: Joi.string().optional(),
      size: Joi.number().optional(),
      price: Joi.array().items(Joi.number()).optional()
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getProductByIdValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      select: Joi.string().optional(),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.createProductValidator = async (req, res, next) => {
  try {
    
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      color: Joi.string().required(),
      brand: Joi.string().required(),
      images: Joi.array().required().items(Joi.string()),
      thumbnail: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category_id: Joi.string().required(),
      SKU: Joi.string().required(),
      attributes: Joi.array().optional(),
      size: Joi.array().items(Joi.number()),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateProductValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().optional(),
      color: Joi.string().optional(),
      brand: Joi.string().optional(),
      images: Joi.array().optional().items(Joi.string()),
      thumbnail: Joi.string().optional(),
      price: Joi.number().optional(),
      description: Joi.string().optional(),
      category_id: Joi.string().optional(),
      SKU: Joi.string().optional(),
      attributes: Joi.array().optional(),
      size: Joi.array().items(Joi.number()),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateStatusProductValidator = async (req, res, next) => {
  try {
   
    const schema = Joi.object().keys({
      status: Joi.string().required().valid('approved', 'rejected', 'disabled'),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.likeProductValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      state: Joi.string().required().valid('like', 'unlike'),
      id: Joi.string().required()
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
