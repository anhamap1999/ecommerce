const express = require('express');
const {
  getProduct,
  saveProduct,
  updateProduct,
  getProductdetails,
  deteleProduct,
} = require('./product.controller');
// import { isAdmin,isAuth } from '../../utils/ultil';
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');

router.get('/', isAuth, getProduct);
router.get('/:id', getProductdetails);
router.post('/', isAuth, isAdmin, saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', isAuth, isAdmin, deteleProduct);

router.use(handleError);
module.exports = router;
