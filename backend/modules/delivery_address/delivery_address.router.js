const express = require('express');
const controller = require('./delivery_address.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./delivery_address.validation');

router.get('/', isAuth, controller.getAddresses);
router.get('/:id', isAuth, controller.getAddressById);
router.post('/', isAuth, controller.createAddress);
router.put(
  '/:id',
  isAuth,
  validator.createOrUpdateAddressValidator,
  controller.updateAddress
);

router.put(
  '/set-default/:id',
  isAuth,
  validator.createOrUpdateAddressValidator,
  controller.setDefaultAddress
);

router.delete('/:id', isAuth, controller.deleteAddress);

router.use(handleError);
module.exports = router;
