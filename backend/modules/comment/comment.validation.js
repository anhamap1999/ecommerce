const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getCommentsValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      product_id: Joi.string().optional(),
      rating: Joi.number().optional().valid(1, 2, 3 ,4 , 5),
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

exports.createCommentValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      content: Joi.string().required(),
      rating: Joi.number().required(),
      product_id: Joi.string().required(),
      images: Joi.array().optional().items(Joi.string()),
<<<<<<< HEAD
      reply_to: Joi.string().optional(),
      
=======
      reply_to: Joi.string().optional()
>>>>>>> a9c1674a2513e8c9790e3efd9f9608909fd02312
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateCommentValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      content: Joi.string().required(),
      rating: Joi.number().required(),
      images: Joi.array().optional().items(Joi.string()),
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};

exports.likeCommentValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      state: Joi.string().required().valid('like', 'unlike'),
      id: Joi.string().required()
    });
    const result = await validate(req.body, schema);
    req.body = result;
    next();
  } catch (error) {
    next(error);
  }
};
