const express = require('express');
const { required } = require('joi');
const {getAdmin,getUser,demo,userRegister} = require('./user.controllers');
const router = express.Router();
const controller = require('./user.controllers');
const validator = require('./user.validation');

// router.get("/createadmin",getAdmin);
// router.get("/admin",demo);
// router.post("/signin",getUser);
// router.post("/register",userRegister);
router.post("/register", validator.registerValidator, controller.register);

module.exports = router;