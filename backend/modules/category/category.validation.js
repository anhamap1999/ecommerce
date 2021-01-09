const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.createCategoryValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.number().valid(1, 2, 3).required(),
      parent_id: Joi.when('type', {
        is: 1,
        then: Joi.string().forbidden(),
        otherwise: Joi.string().required(),
      }),
      image: Joi.string().required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateCategoryValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().optional(),
      type: Joi.number().valid(1, 2, 3).optional(),
      parent_id: Joi.when('type', {
        is: 1,
        then: Joi.string().forbidden(),
        otherwise: Joi.string().optional(),
      }),
      image: Joi.string().optional(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateStatusCategoryValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string().required().valid('active', 'disabled'),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getCategoriesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string()
        .optional()
        .valid('active', 'disabled'),
      parent_id: Joi.string().optional(),
      type: Joi.number().optional().valid(1, 2, 2),
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
