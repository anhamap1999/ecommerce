const Config = require('./config.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getConfigs = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-name',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Config.paginate(query, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getConfigById = async (req, res, next) => {
  try {
    const { select } = req.query;

    const config = await Config.findById(req.params.id).select(select);

    if (!config) {
      throw new Error({
        statusCode: 404,
        message: 'config.notFound',
        messages: { config: 'config not found' },
      });
    }
    const success = new Success({ data: config });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createConfig = async (req, res, next) => {
  try {
    const config = new Config(req.body);
    config.created_by = req.user._id;
    const result = await config.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateConfig = async (req, res, next) => {
  try {
    let config = await Config.findById(req.params.id);

    if (!config) {
      throw new Error({
        statusCode: 404,
        message: 'config.notFound',
        messages: { config: 'config not found' },
      });
    }
    config = { ...config._doc, ...req.body };
    config.updated_at = Date.now();
    config.updated_by = req.user._id;
    await Config.findByIdAndUpdate(req.params.id, config);
    const success = new Success({ data: config });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
