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

exports.changePasswordValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      password: Joi.string().required().max(100).min(6),
      new_password: Joi.string().required().max(100).min(6),
      confirm_new_password: Joi.string().required().max(100).min(6),
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
      // phone_number: Joi.string().length(10),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getUsersValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      status: Joi.string()
        .optional()
        .valid('active', 'disabled'),
      role: Joi.string().optional().valid('admin', 'staff', 'customer'),
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

exports.updateStatusUserValidator = async (req, res, next) => {
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