const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.createBankAccountValidator = async (req, res, next) => {
  try {
    console.log("zoday")
    const schema = Joi.object().keys({
      account_number: Joi.string().required(),
      account_name: Joi.string().required(),
      bank: Joi.string().required(),
      branch: Joi.array().required().items(Joi.string()),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
    
  } catch (error) {
    next(error);
  }
};