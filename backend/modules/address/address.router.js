const express = require('express');
const controller = require('./address.controller');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./address.validation');

router.get('/province', validator.getProvincesValidator, controller.getProvinces);
router.get('/district', validator.getDistrictsValidator, controller.getDistricts);
router.get('/ward', validator.getWardsValidator, controller.getWards);
router.post('/', controller.postAddress);

router.use(handleError);
module.exports = router;
