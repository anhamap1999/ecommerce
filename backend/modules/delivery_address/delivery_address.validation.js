const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.createOrUpdateAddressValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      full_name: Joi.string().required(),
      phone_number: Joi.string().required(),
      province_number: Joi.number().required(),
      district_number: Joi.number().required(),
      ward_number: Joi.number().required(),
      text: Joi.number().required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};