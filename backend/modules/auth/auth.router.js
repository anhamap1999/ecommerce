const express = require('express');

const router = express.Router();

const { loginByEmail, loginByPhone, logout, forgotPassword, resetPassword } = require('./auth.controller');
const { handleError } = require('../../middlewares/error.middleware');
const { loginValidator } = require('./auth.validation');

router.post('/login-by-email', loginValidator, loginByEmail);
router.post('/login-by-phone', loginByPhone);
router.put('/logout', logout);
router.post('/forget-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.use(handleError);

module.exports = router;