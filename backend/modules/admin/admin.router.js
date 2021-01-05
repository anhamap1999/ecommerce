const express = require('express');

const router = express.Router();

const controller = require('./admin.controller');
const { handleError } = require('../../middlewares/error.middleware');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
// const { loginByEmailValidator, loginByPhoneValidator, forgotPasswordValidator, resetPasswordValidator } = require('./auth.validation');

router.get('/', isAuth, isAdmin, controller.getAdmins);
router.get('/:id', isAuth, isAdmin, controller.getAdminById);
router.post('/', isAuth, isAdmin, controller.addAdmin);
router.delete('/:id', isAuth, isAdmin, controller.deleteAdmin);

router.use(handleError);

module.exports = router;