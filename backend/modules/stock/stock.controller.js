const Stock = require('./stock.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const Product = require('../products/product.model');
const StockHistory = require('../stock_history/stock_history.model');
const Revenue = require('../revenue/revenue.model');
const moment = require('moment');

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
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          try {
            const stocks = await Stock.populate(result.docs, [
              { path: 'product_id' },
            ]);
            success
              .addField('data', stocks)
              .addField('total_page', result.totalPages)
              .addField('page', result.page)
              .addField('total', result.totalDocs);
          }catch(error) {
            next(error);
          }
          // const stocks = await Stock.populate(result.docs, [
          //   { path: 'product_id' },
          // ]);
          // success
          //   .addField('data', stocks)
          //   .addField('total_page', result.totalPages)
          //   .addField('page', result.page)
          //   .addField('total', result.totalDocs);
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
    const stock = await Stock.findById(req.params.id).populate({
      path: 'product_id',
    });

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
    const stock = await Stock.findOne({
      product_id: req.body.product_id,
      size: req.body.size,
    }).populate({ path: 'product_id' });
    const success = new Success({ data: stock });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.importStock = async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id).populate({
      path: 'product_id',
    });

    if (!stock) {
      throw new Error({
        statusCode: 404,
        message: 'stock.notFound',
        messages: { stock: 'stock not found' },
      });
    }
    // if (stock.created_by !== req.user._id) {
    //   throw new Error({
    //     statusCode: 404,
    //     message: 'stock.doNotHavePermission',
    //     messages: { stock: 'do not have permission' },
    //   });
    // }
    stock.updated_at = Date.now();
    stock.updated_by = req.user._id;
    stock = { ...stock._doc, stock: stock.stock + req.body.stock };
    await Stock.findByIdAndUpdate(req.params.id, stock);
    const stock_history = new StockHistory({
      product_id: stock.product_id._id,
      size: stock.size,
      stock: req.body.stock,
      price: req.body.price,
      type: 'import',
    });
    const bef = await stock_history.save();
    console.log('STOCK HISTORY', bef);

    const existedRevenue = await Revenue.findOne({
      date: moment().startOf('date').toISOString(),
    });
    if (!existedRevenue) {
      const revenue = new Revenue({
        total_expenditure: req.body.price * req.body.stock,
        total: -req.body.price * req.body.stock,
        date: moment().startOf('date').toISOString(),
      });
      const abc = await revenue.save();
      console.log('REVENUE', abc);
    } else {
      existedRevenue.total_expenditure += req.body.price * req.body.stock;
      existedRevenue.total -= req.body.price * req.body.stock;
      await existedRevenue.save();
    }
    const product = await Product.findById(stock.product_id);
    product.out_of_stock = false;
    await Product.findByIdAndUpdate(stock.product_id, product);
    const result = await Stock.findById(req.params.id).populate({
      path: 'product_id',
    });
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
exports.createStock = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const stockPromises = [];
    products.forEach((p) => {
      const { _id, size } = p;
      size.forEach((s) => {
        stockPromises.push(
          Stock.create({
            product_id: _id,
            size: s,
            stock: 0,
            created_by: req.user._id,
          })
        );
      });
    });

    await Promise.all([...stockPromises]);
    const success = new Success({});
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
