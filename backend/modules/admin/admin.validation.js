const Joi = require('joi');
const { Error } = require('../../utils/Error');
const { validate } = require('../../commons/utils');

exports.addAdminValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      id: Joi.string().required(),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
