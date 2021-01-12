const Notification = require('./notification.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');

exports.getNotifications = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Notification.paginate({ user_id: req.user._id, ...query }, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const notifications = await Notification.populate(result.docs, [
            { path: 'user_id' },
            { path: 'object_id' },
          ]);
          success
            .addField('data', notifications)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.adminGetNotification = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Notification.paginate({for: 'admin', ...query}, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const notifications = await Notification.populate(result.docs, [
            { path: 'user_id' },
            { path: 'object_id' },
          ]);
          success
            .addField('data', notifications)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.staffGetNotification = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Notification.paginate({for: 'staff', ...query}, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const notifications = await Notification.populate(result.docs, [
            { path: 'user_id' },
            { path: 'object_id' },
          ]);
          success
            .addField('data', notifications)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};


exports.createNotification = async (req, res, next) => {
  try {
    const notification = new Notification(req.body);
    notification.user_id = req.user._id;
    const result = await notification.save();
    const created_notification = await Notification.findById(result._id).populate([
      { path: 'user_id' },
      { path: 'object_id' },
    ]);
    const success = new Success({ data: created_notification });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      throw new Error({
        statusCode: 404,
        message: 'notification.notFound',
        messages: { notification: 'notification not found' },
      });
    }
    notification.is_read = true;
    notification.updated_by = Date.now();
    await Notification.findByIdAndUpdate(req.params.id, notification);
    const result = await Notification.findById(req.params.id).populate([
      { path: 'user_id' },
      { path: 'object_id' },
    ]);
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.markAllNotificationsAsRead = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ is_read: false });
    notification.is_read = true;
    notification.updated_by = Date.now();
    // const result = await Notification.findByIdAndUpdate(
    //   req.params.id,
    //   notifications.map((item) => {
    //     item.is_read = true;
    //     item.updated_by = Date.now();
    //     return item;
    //   })
    // );
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
