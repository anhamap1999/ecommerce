const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getConfigsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      key: Joi.string().optional(),
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

exports.getConfigByIdValidator = async (req, res, next) => {
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

exports.createOrUpdateConfigValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      key: Joi.string().required(),
      value: Joi.required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
