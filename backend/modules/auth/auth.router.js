const express = require('express');

const router = express.Router();

const {
  loginByEmail,
  loginByPhone,
  logout,
  forgotPassword,
  resetPassword,
} = require('./auth.controller');
const { handleError } = require('../../middlewares/error.middleware');
const {
  loginByEmailValidator,
  loginByPhoneValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('./auth.validation');

router.post('/login-by-email', loginByEmailValidator, loginByEmail);
router.post('/login-by-phone', loginByPhoneValidator, loginByPhone);
router.put('/logout', logout);
router.post('/forget-password', forgotPasswordValidator, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidator, resetPassword);

router.use(handleError);

module.exports = router;
