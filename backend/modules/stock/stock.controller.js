const Stock = require('./stock.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const Product = require('../products/product.model');

exports.getStocks = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Stock.paginate(query, options)
      .then(async(result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const stocks = await Stock.populate(result.docs, [{ path: 'product_id' }]);
          success
            .addField('data', stocks)
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

exports.getStockById = async (req, res, next) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      throw new Error({
        statusCode: 404,
        message: 'stock.notFound',
        messages: { stock: 'stock not found' },
      });
    }
    const success = new Success({ data: stock });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getStocksByProductId = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.product_id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        messages: { product: 'product not found' },
      });
    }
    const stocks = await Stock.find({ product_id: req.body.product_id });
    const success = new Success({ data: stocks });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getStockByProductIdAndSize = async (req, res, next) => {
  try {
    const product = await Product.find(req.body.product_id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        messages: { product: 'product not found' },
      });
    }
    const stock = await Stock.findOne({ product_id: req.body.product_id, size: req.body.size });
    const success = new Success({ data: stock });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.importStock = async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id);

    if (!stock) {
      throw new Error({
        statusCode: 404,
        message: 'stock.notFound',
        messages: { stock: 'stock not found' },
      });
    }
    if (stock.created_by !== req.user._id) {
      throw new Error({
        statusCode: 404,
        message: 'stock.doNotHavePermission',
        messages: { stock: 'do not have permission' },
      });
    }
    stock.updated_at = Date.now();
    stock = { ...stock._doc, stock: stock.stock + req.body.stock };
    await Stock.findByIdAndUpdate(req.params.id, stock);
    const success = new Success({ data: stock });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};