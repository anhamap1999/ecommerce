const express = require('express');
const controller = require('./stock.controller');
const { isAuth, isAdmin, isStaff } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./stock.validation');

router.get('/', validator.getStocksValidator, controller.getStocks);
router.get(
  '/product',
  validator.getStocksByProductIdValidator,
  controller.getStocksByProductId
);
router.get(
  '/product-size',
  validator.getStockByProductIdAndSizeValidator,
  controller.getStockByProductIdAndSize
);
router.put(
  '/:id',
  isAuth, isStaff,
  validator.importStockValidator,
  controller.importStock
);
router.use(handleError);
module.exports = router;
