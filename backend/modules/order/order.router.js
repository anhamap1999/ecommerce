const express = require('express');
const controller = require('./order.controller');
const { isAuth, isAdmin, isStaff } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./order.validation');

router.get('/', isAuth, controller.getOrders);
router.get('/:id', isAuth, controller.getOrderById);
router.post('/', isAuth, isStaff, validator.createOrderValidator, controller.saveOrder);
router.put('/:id', isAuth, isStaff, validator.updateOrderValidator, controller.updateOrder);

router.use(handleError);
module.exports = router;
