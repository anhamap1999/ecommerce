const Joi = require('joi');
const { validate } = require('../../commons/utils');

exports.getStockHistoriesValidator = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      select: Joi.string().optional(),
      limit: Joi.number().optional(),
      page: Joi.number().optional(),
      sort: Joi.string().optional(),
      product_id: Joi.string().optional(),
      size: Joi.number().optional(),
      type: Joi.string().optional().valid('import', 'export'),
    });
    const result = await validate(req.query, schema);
    req.query = result;
    next();
  } catch (error) {
    next(error);
  }
};
