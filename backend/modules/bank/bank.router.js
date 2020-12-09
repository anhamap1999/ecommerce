const express = require('express');
const controller = require('./bank.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./bank.validation');

router.get('/', isAuth, controller.getBanks);
router.get(
  '/:id',
  isAuth,
  controller.getBankById
);
router.post(
  '/',
  isAuth,
  validator.createBankValidator,
  controller.createBank
);
router.delete(
  '/:id',
  isAuth,
  controller.deleteBank
);

router.use(handleError);
module.exports = router;
