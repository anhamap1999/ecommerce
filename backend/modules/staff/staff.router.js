const express = require('express');

const router = express.Router();

const controller = require('./staff.controller');
const { handleError } = require('../../middlewares/error.middleware');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const validator = require('./staff.validation');

router.get('/', isAuth, isAdmin, controller.getStaff);
router.get('/:id', isAuth, isAdmin, controller.getStaffById);
router.post('/', isAuth, isAdmin, validator.addStaffValidator, controller.addStaff);
router.delete('/:id', isAuth, isAdmin, controller.deleteStaff);

router.use(handleError);

module.exports = router;