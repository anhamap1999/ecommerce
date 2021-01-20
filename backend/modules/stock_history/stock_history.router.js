const express = require('express');
const controller = require('./stock_history.controller');
const {
  isAuth,
  isAdmin,
  isStaff,
} = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./stock_history.validation');

router.get(
  '/',
  isAuth,
  isStaff,
  validator.getStockHistoriesValidator,
  controller.getStockHistories
);
router.get('/:id', isAuth, isStaff, controller.getStockHistoryById);
router.use(handleError);
module.exports = router;
