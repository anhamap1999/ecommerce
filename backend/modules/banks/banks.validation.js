const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getBanksValidator = async (req, res, next) => {
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

exports.getBranchesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      sort: Joi.string().optional(),
      populate: Joi.string().optional(),
      province_number: Joi.number().required(),
      bank_number: Joi.number().required()
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};