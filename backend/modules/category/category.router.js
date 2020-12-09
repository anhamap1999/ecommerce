const express = require('express');
const {
  addCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
} = require('./category.controller');
// import {isAuth,isAdmin} from '../../utils/ultil';
const router = express.Router();
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const controller = require('./category.controller');
const validator = require('./category.validation');
const { handleError } = require('../../middlewares/error.middleware');

router.post(
  '/admin',
  isAuth,
  isAdmin,
  validator.createCategoryValidator,
  controller.createCategory
);
router.put(
  '/admin/:id',
  isAuth,
  isAdmin,
  validator.updateCategoryValidator,
  controller.updateCategory
);
router.put(
  '/admin/update-status/:id',
  isAuth,
  isAdmin,
  validator.updateStatusCategoryValidator,
  controller.updateStatusCategory
);
router.get('/admin', isAuth, isAdmin, validator.getCategoriesValidator, controller.getCategoriesByAdmin);
router.get('/admin/:id', isAuth, isAdmin, controller.adminGetCategoryById);
router.delete('/:id', isAuth, isAdmin, controller.deleteCategory);
router.get('/:id', controller.getCategoryById);

router.get('/', controller.getCategories);


router.use(handleError);
// router.post('/add',isAuth,isAdmin, addCategory);
// router.put('/update/:id', updateCategory);
// router.delete('/delete/:id', deleteCategory);
// router.get('/list' , listCategories);
// router.get('/:id' , getCategory );

module.exports = router;
