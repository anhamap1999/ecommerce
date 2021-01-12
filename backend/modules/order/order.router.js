const express = require('express');
const controller = require('./order.controller');
const {
  isAuth,
  isAdmin,
  isStaff,
} = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./order.validation');

router.get('/', isAuth, validator.getOrdersValidator, controller.getOrders);
router.get(
  '/admin',
  isAuth,
  isStaff,
  validator.getOrdersValidator,
  controller.getOrdersByAdmin
);
router.put(
  '/admin/:id',
  isAuth,
  isStaff,
  validator.createOrderValidator,
  controller.updateOrderByAdmin
);
router.get('/:id', isAuth, controller.getOrderById);
router.post('/', isAuth, validator.createOrderValidator, controller.saveOrder);
router.put(
  '/:id',
  isAuth,
  validator.updateOrderValidator,
  controller.updateOrder
);

router.use(handleError);
module.exports = router;
