const express = require('express');
const controller = require('./bank_account.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./bank_account.validation');

router.get('/', isAuth, controller.getBankAccounts);
router.get('/:id', isAuth, controller.getBankAccountById);
router.post(
  '/',
  isAuth,
  validator.createBankAccountValidator,
  controller.createBankAccount
);
router.delete('/:id', isAuth, controller.deleteBankAccount);

router.use(handleError);
module.exports = router;
