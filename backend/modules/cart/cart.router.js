const express = require('express');
const controller = require('./cart.controller');
// import { isAdmin,isAuth } from '../../utils/ultil';
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./cart.validation');

router.get('/', isAuth, controller.getCarts);

router.get(
  '/:id',
  isAuth,
  controller.getCartById
);
router.post(
  '/',
  isAuth,
  validator.addCartValidator,
  controller.addCart
);
router.put(
  '/:id',
  isAuth,
  validator.updateCartValidator,
  controller.updateCart
);
router.delete(
  '/:id',
  isAuth,
  controller.deleteCart
);


// router.put('/:id', updateProduct);
// router.delete('/:id', isAuth, isAdmin, deteleProduct);

router.use(handleError);
module.exports = router;
