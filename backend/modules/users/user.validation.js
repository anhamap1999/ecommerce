const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.registerValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .min(8)
        .max(50)
        .regex(/[\w]+?@[\w]+?\.[a-z]{2,4}/, 'email must have correct format'),
      password: Joi.string().required().min(6).max(100),
      confirm_password: Joi.string().required().min(6).max(100),
      phone_number: Joi.string().length(10),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateUserValidator = async (req, res, next) => {
    try {
      const schema = Joi.object().keys({
        full_name: Joi.string().required().max(50),
        gender: Joi.string().required().valid('female', 'male', 'other'),
        birthday: Joi.string(),
        phone_number: Joi.string().length(10)
      });
      const result = await validate(req.body, schema);
      req.body = result;
      next();
    } catch (error) {
      next(error);
    }
  };
  
