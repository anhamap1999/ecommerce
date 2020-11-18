const Joi = require('joi');
const { Error } = require('../../utils/Error');
const { validate } = require('../../commons/utils');

exports.loginValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      username: Joi.string()
        .min(8)
        .max(30)
        .required()
        .regex(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
      password: Joi.string().min(6).max(100).required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
