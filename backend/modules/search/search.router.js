const express = require('express');
const controller = require('./search.controller');
const {
  isAuth,
  isAdmin,
  isStaff,
} = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
// const validator = require('./search.validation');

router.get('/', controller.search);
router.get('/admin', isStaff, controller.adminSearch);

router.use(handleError);

module.exports = router;
