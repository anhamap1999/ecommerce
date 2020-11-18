const Joi = require('joi');
const { Error } = require('../utils/Error');

exports.validate = async (data, schema) => {
  try {
    const result = await schema.validateAsync(data, { abortEarly: false });
    return Promise.resolve(result);
  } catch (error) {
    if (Joi.isError(error)) {
      const messages = {};
      error.details.map((err) => (messages[err.context.key] = err.message));
      const message = error.details[0].type;
      const validateError = new Error({ statusCode: 400, message, messages });
      return Promise.reject(validateError);
    }
    return Promise.reject(error);
  }
};