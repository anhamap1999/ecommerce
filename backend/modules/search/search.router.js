const express = require('express');
const controller = require('./search.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
// const validator = require('./search.validation');

router.get('/', controller.search);
router.get('/admin', controller.adminSearch);

router.use(handleError);

module.exports = router;