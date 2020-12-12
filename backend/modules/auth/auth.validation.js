const Joi = require('joi');
const { Error } = require('../../utils/Error');
const { validate } = require('../../commons/utils');

exports.loginByEmailValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .min(8)
        .max(50)
        .required()
        .regex(/[\w]+?@[\w]+?\.[a-z]{2,4}/),
      password: Joi.string().min(6).max(100).required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.loginByPhoneValidator = async (req, res, next) => {
  try {
 
    const schema = Joi.object().keys({
      phone_number: Joi.string()
        .length(10)
        .required(),
        // .regex(/[\w]+?@[\w]+?\.[a-z]{2,4}/),
      password: Joi.string().min(6).max(100).required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.forgotPasswordValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string()
        .min(8)
        .max(50)
        .required()
        .regex(/[\w]+?@[\w]+?\.[a-z]{2,4}/),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.resetPasswordValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      new_password: Joi.string().min(6).max(100).required(),
      confirm_new_password: Joi.string().min(6).max(100).required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};