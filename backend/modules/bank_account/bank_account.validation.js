const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.createBankAccountValidator = async (req, res, next) => {
  try {
    console.log('zoday');
    const schema = Joi.object().keys({
      account_number: Joi.string().required(),
      account_name: Joi.string().required(),
      bank_number: Joi.number().required(),
      branch_number: Joi.number().required(),
      province_number: Joi.string().required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
