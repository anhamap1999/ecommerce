const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getProvincesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      sort: Joi.string().optional(),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getDistrictsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      sort: Joi.string().optional(),
      province_number: Joi.number().required()
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getWardsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      sort: Joi.string().optional(),
      province_number: Joi.number().required(),
      district_number: Joi.number().required()
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};