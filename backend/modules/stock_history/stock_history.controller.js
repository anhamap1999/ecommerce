const StockHistory = require('./stock_history.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getStockHistories = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await StockHistory.paginate(query, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const stock_histories = await StockHistory.populate(result.docs, [
            { path: 'product_id' },
          ]);
          success
            .addField('data', stock_histories)
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

exports.getStockHistoryById = async (req, res, next) => {
  try {
    const stock_history = await StockHistory.findById(req.params.id).populate({
      path: 'product_id',
    });

    if (!stock_history) {
      throw new Error({
        statusCode: 404,
        message: 'stockHistory.notFound',
        messages: { stockHistory: 'stock history not found' },
      });
    }
    const success = new Success({ data: stock_history });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
