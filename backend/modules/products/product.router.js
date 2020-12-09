const express = require('express');
const controller = require('./product.controller');
// import { isAdmin,isAuth } from '../../utils/ultil';
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./product.validation');

router.get('/', validator.getProductsValidator, controller.getProducts);
router.get(
  '/admin',
  isAuth,
  isAdmin,
  validator.getProductsValidator,
  controller.getProductsByAdmin
);
router.get(
  '/:id',
  validator.getProductByIdValidator,
  controller.getProductById
);
router.get(
  '/admin/:id',
  validator.getProductByIdValidator,
  controller.adminGetProductById
);
router.post(
  '/admin',
  isAuth,
  isAdmin,
  validator.createProductValidator,
  controller.createProduct
);
router.put(
  '/admin/:id',
  isAuth,
  isAdmin,
  validator.updateProductValidator,
  controller.updateProduct
);
router.put(
  '/admin/update-status/:id',
  isAuth,
  isAdmin,
  validator.updateStatusProductValidator,
  controller.updateStatusProduct
);


// router.put('/:id', updateProduct);
// router.delete('/:id', isAuth, isAdmin, deteleProduct);

router.use(handleError);
module.exports = router;
