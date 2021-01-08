const express = require('express');
const { required } = require('joi');
const { getAdmin, getUser, demo, userRegister } = require('./user.controllers');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const controller = require('./user.controllers');
const validator = require('./user.validation');
const { handleError } = require('../../middlewares/error.middleware');

// router.get("/createadmin",getAdmin);
// router.get("/admin",demo);
// router.post("/signin",getUser);
// router.post("/register",userRegister);
router.post('/register', validator.registerValidator, controller.register);
router.post(
  '/change-password',
  isAuth,
  validator.changePasswordValidator,
  controller.changePassword
);
router.put(
  '/update',
  isAuth,
  validator.updateUserValidator,
  controller.updateUser
);
router.get(
  '/admin',
  isAuth,
  isAdmin,
  validator.getUsersValidator,
  controller.getUsers
);
router.get('/', isAuth, controller.getUserInfo);
router.put(
  '/update-status/:id',
  isAuth,
  isAdmin,
  validator.updateStatusUserValidator,
  controller.updateStatusUser
);

router.use(handleError);

module.exports = router;
