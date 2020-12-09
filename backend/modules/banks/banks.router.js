const express = require('express');
const controller = require('./banks.controller');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./banks.validation');

router.get('/', validator.getBanksValidator, controller.getBanks);
router.get('/branch', validator.getBranchesValidator, controller.getBranches);
// router.post('/', controller.postBanks);

router.use(handleError);
module.exports = router;
