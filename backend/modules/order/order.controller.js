const Order = require('./order.model');
const Product = require('../products/product.model');
const Stock = require('../stock/stock.model');
const Notification = require('../notification/notification.model');

exports.getOrders = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Order.paginate({ created_by: req.user._id, ...query }, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          const orders = await Order.populate(result.docs, [{ path: 'shipping' }, { path: 'order_items', populate: 'product_id' }, { path: 'created_by' }]);
          success
            .addField('data', orders)
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

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      created_by: req.user._id,
    }).populate([{ path: 'shipping' }, { path: 'order_items', populate: 'product_id' }, { path: 'created_by' }]);

    if (!order) {
      throw new Error({
        statusCode: 404,
        message: 'order.notFound',
        messages: { order: 'order not found' },
      });
    }
    const success = new Success({ data: order });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.saveOrder = async (req, res) => {
  try {
    const { order_items } = req.body;
    order_items.forEach(async (item) => {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error({
          statusCode: 404,
          message: 'product.notFound',
          messages: { product: 'product not found' },
        });
      }
      const stock = await Stock.findOne({ product_id: item.product_id });
      if (stock.stock < item.quantity) {
        throw new Error({
          statusCode: 404,
          message: 'stock.notFound',
          messages: { stock: 'stock is not enough' },
        });
      }
    });
    order_items.forEach(async (item) => {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error({
          statusCode: 404,
          message: 'product.notFound',
          messages: { product: 'product not found' },
        });
      }
      product.sold_count+= item.quantity;
      await Product.findByIdAndUpdate(item.product_id, product);
      const stock = await Stock.findOne({ product_id: item.product_id });
      stock.stock -= item.quantity;
      await Stock.findOneAndUpdate({ product_id: item.product_id }, stock);
    });
    const newOrder = new Order({
      order_items: req.body.order_items,
      created_by: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      items_price: req.body.items_price,
      shipping_price: req.body.shipping_price,
      total_price: req.body.total_price,
    });
    const newOrderCreated = await newOrder.save();
    
    const notification_for_customer = new Notification({
      user_id: req.user._id,
      type: 'order_add',
      title: 'Đơn hàng mới',
      message: `Bạn vừa đặt đơn hàng mới.`,
      object_id: newOrderCreated._id,
      onModel: 'Order',
    });
    const created_notification_for_customer = await notification_for_customer.save();
    req.io.emit(req.user._id, created_notification_for_customer);

    const notification_for_staff = new Notification({
      user_id: req.user._id,
      type: 'order_add',
      title: 'Đơn hàng mới',
      message: `Khách hàng ${req.user.full_name} vừa đặt đơn hàng mới.`,
      object_id: newOrderCreated._id,
      onModel: 'Order',
      for: 'staff'
    });
    const created_notification_for_staff = await notification_for_staff.save();
    req.io.emit('staff_notification', created_notification_for_staff);

    const success = new Success({ data: newOrderCreated });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate([{ path: 'shipping' }, { path: 'order_items', populate: 'product_id' }, { path: 'created_by' }]);
    if (!order) {
      throw new Error({
        statusCode: 404,
        message: 'order.notFound',
        messages: { order: 'order not found' },
      });
    }
    if (req.body.status === 'paid') {
      order.is_paid = true;
      order.paid_at = Date.now();
      order.status = 'completed';
      // order.payment = {
      //   paymentMethod: 'paypal',
      //   paymentResult: {
      //     payerID: req.body.payerID,
      //     orderID: req.body.orderID,
      //     paymentID: req.body.paymentID,
      //   },
      // };
      const notification = new Notification({
        user_id: order.created_by._id,
        type: 'order_update_paid',
        title: 'Đơn hàng',
        message: `Khách hàng ${order.created_by.full_name} vừa được thanh toán.`,
        object_id: order._id,
        onModel: 'Order',
        for: 'staff'
      });
      const created_notification = await notification.save();
      req.io.emit('staff_notification', created_notification);
    } else if (req.body.status === 'delivered') {
      order.is_delivered = true;
      order.delivered_at = Date.now();
      const notification = new Notification({
        user_id: order.created_by._id,
        type: 'order_update_delivered',
        title: 'Đơn hàng',
        message: `Đơn hàng đã được giao thành công.`,
        object_id: order._id,
        onModel: 'Order',
      });
      const created_notification = await notification.save();
      req.io.emit(order.created_by._id, created_notification);
    }
    order.updated_at = Date.now();
    await Order.findByIdAndUpdate(req.params.id, order);
    const success = new Success({ data: order });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
