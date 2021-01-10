const express = require('express');
const controller = require('./revenue.controller');
const {
  isAuth,
  isAdmin,
  isStaff,
} = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./revenue.validation');

router.get(
  '/',
  isAuth,
  isStaff,
  validator.getRevenuesValidator,
  controller.getRevenues
);
router.get(
  '/:id',
  isAuth,
  isStaff,
  controller.getRevenueById
);
router.use(handleError);
module.exports = router;
