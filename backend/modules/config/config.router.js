const express = require('express');
const controller = require('./config.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./config.validation');

router.get('/', validator.getConfigsValidator, controller.getConfigs);
router.get('/:id', validator.getConfigByIdValidator, controller.getConfigById);
router.post(
  '/admin',
  isAuth,
  isAdmin,
  validator.createOrUpdateConfigValidator,
  controller.createConfig
);
router.put(
  '/admin/:id',
  isAuth,
  isAdmin,
  validator.createOrUpdateConfigValidator,
  controller.updateConfig
);

router.use(handleError);
module.exports = router;
