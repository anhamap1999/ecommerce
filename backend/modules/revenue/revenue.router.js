const express = require('express');
const controller = require('./revenue.controller');
const { isAuth, isAdmin, isStaff } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./revenue.validation');

router.get('/', validator.getStocksValidator, controller.getStocks);
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
