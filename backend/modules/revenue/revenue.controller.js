const Revenue = require('./revenue.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getRevenues = async (req, res, next) => {
  try {
    const { select, sort, page, limit, start_time, end_time } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };
    const query = {};
    if (start_time && end_time) {
      query.date = { $gte: start_time, $lte: end_time };
    }

    const success = new Success({});
    await Revenue.paginate(query, options)
      .then(async (result) => {
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

exports.getRevenueById = async (req, res, next) => {
  try {
    const revenue = await Revenue.findById(req.params.id);

    if (!revenue) {
      throw new Error({
        statusCode: 404,
        message: 'revenue.notFound',
        messages: { revenue: 'revenue not found' },
      });
    }
    const success = new Success({ data: revenue });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
