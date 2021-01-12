const express = require('express');
const controller = require('./notification.controller');
const {
  isAuth,
  isAdmin,
  isStaff,
} = require('../../middlewares/auth.middleware');
const router = express.Router();
const { handleError } = require('../../middlewares/error.middleware');
const validator = require('./notification.validation');

router.get(
  '/',
  isAuth,
  validator.getNotificationsValidator,
  controller.getNotifications
);
router.get('/:id', isAuth, isAdmin, controller.adminGetNotification);
router.post(
  '/',
  isAuth,
  isStaff,
  validator.createNotificationValidator,
  controller.createNotification
);
router.put('/:id', isAuth, controller.markNotificationAsRead);
router.put('/mark-all-as-read', isAuth, controller.markAllNotificationsAsRead);

router.use(handleError);
module.exports = router;
