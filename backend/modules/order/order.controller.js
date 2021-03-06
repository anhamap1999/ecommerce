const Order = require('./order.model');
const Product = require('../products/product.model');
const Stock = require('../stock/stock.model');
const Notification = require('../notification/notification.model');
const StockHistory = require('../stock_history/stock_history.model');
const Revenue = require('../revenue/revenue.model');
const Cart = require('../cart/cart.model');
const moment = require('moment');
const { Error, Success } = require('../../utils');
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
          try {
            const orders = await Order.populate(result.docs, [
              { path: 'shipping' },
              { path: 'order_items', populate: 'product_id' },
              { path: 'created_by' },
            ]);
            success
              .addField('data', orders)
              .addField('total_page', result.totalPages)
              .addField('page', result.page)
              .addField('total', result.totalDocs);
          }catch(error) {
            next(error);
          }
          // const orders = await Order.populate(result.docs, [
          //   { path: 'shipping' },
          //   { path: 'order_items', populate: 'product_id' },
          //   { path: 'created_by' },
          // ]);
          // success
          //   .addField('data', orders)
          //   .addField('total_page', result.totalPages)
          //   .addField('page', result.page)
          //   .addField('total', result.totalDocs);
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
exports.getOrdersByAdmin = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-created_at',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Order.paginate(query, options)
      .then(async (result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          try {
            const orders = await Order.populate(result.docs, [
              { path: 'shipping' },
              { path: 'order_items', populate: 'product_id' },
              { path: 'created_by' },
            ]);
            success
              .addField('data', orders)
              .addField('total_page', result.totalPages)
              .addField('page', result.page)
              .addField('total', result.totalDocs);
          }catch(error) {
            next(error);
          }
          // const orders = await Order.populate(result.docs, [
          //   { path: 'shipping' },
          //   { path: 'order_items', populate: 'product_id' },
          //   { path: 'created_by' },
          // ]);
          // success
          //   .addField('data', orders)
          //   .addField('total_page', result.totalPages)
          //   .addField('page', result.page)
          //   .addField('total', result.totalDocs);
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

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      created_by: req.user._id,
    }).populate([
      { path: 'shipping' },
      { path: 'order_items', populate: 'product_id' },
      { path: 'created_by' },
    ]);

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

exports.saveOrder = async (req, res, next) => {
  try {
    const { order_items } = req.body;
    order_items.forEach(async (item) => {
      try {
        const product = await Product.findById(item.product_id);
        if (!product) {
          throw new Error({
            statusCode: 404,
            message: 'product.notFound',
            messages: { product: 'product not found' },
          });
        }
        const stock = await Stock.findOne({
          product_id: item.product_id,
          size: item.size,
        });
        if (!stock) {
          throw new Error({
            statusCode: 404,
            message: 'stock.notFound',
            messages: { stock: 'stock is not found' },
          });
        }
        if (stock.stock < item.quantity) {
          throw new Error({
            statusCode: 404,
            message: 'stock.notFound',
            messages: { stock: 'stock is not enough' },
          });
        }
      } catch (error) {
        next(error);
      }
    });
    order_items.forEach(async (item) => {
      try {
        const cart = await Cart.findOne({
          product_id: item.product_id,
          size: item.size,
        });
        if (!cart) {
          throw new Error({
            statusCode: 404,
            message: 'cart.notFound',
            messages: { cart: 'cart not found' },
          });
        }
        await Cart.findByIdAndRemove(cart._id);
      } catch (error) {
        next(error);
      }
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
    newOrder.progress.push({
      status: 'handling',
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
    //res.io.emit(req.user._id, created_notification_for_customer);

    const notification_for_staff = new Notification({
      user_id: req.user._id,
      type: 'order_add',
      title: 'Đơn hàng mới',
      message: `Khách hàng ${req.user.full_name} vừa đặt đơn hàng mới.`,
      object_id: newOrderCreated._id,
      onModel: 'Order',
      for: 'staff',
    });
    const created_notification_for_staff = await notification_for_staff.save();
    //res.io.emit('staff_notification', created_notification_for_staff);
    const new_order = await Order.findById(newOrderCreated._id).populate([
      { path: 'shipping' },
      { path: 'order_items', populate: 'product_id' },
      { path: 'created_by' },
    ]);
    const success = new Success({ data: new_order });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderByAdmin = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate([
      { path: 'shipping' },
      { path: 'order_items', populate: 'product_id' },
      { path: 'created_by' },
    ]);
    const { order_items } = order;
    if (!order) {
      throw new Error({
        statusCode: 404,
        message: 'order.notFound',
        messages: { order: 'order not found' },
      });
    }
    switch (req.body.status) {
      case 'picking': {
        if (order.status !== 'handling') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBePicking',
            messages: {
              order: 'only handling order can be changed into picking',
            },
          });
        }
        order.status = 'picking';
        order.progress.push({
          status: 'picking',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_picking',
          title: 'Đơn hàng',
          message: `Đơn hàng đã được xác nhận, shop đang chuẩn bị hàng.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        break;
      }
      case 'delivering': {
        if (order.status !== 'picking') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeDelivering',
            messages: {
              order: 'only picking order can be changed into delivering',
            },
          });
        }
        order_items.forEach(async (item) => {
          try {
            const product = await Product.findById(item.product_id._id);
            if (!product) {
              throw new Error({
                statusCode: 404,
                message: 'product.notFound',
                messages: { product: 'product not found' },
              });
            }
            const stock = await Stock.findOne({
              product_id: item.product_id._id,
              size: item.size,
            });
            if (stock.stock < item.quantity) {
              throw new Error({
                statusCode: 404,
                message: 'stock.notFound',
                messages: { stock: 'stock is not enough' },
              });
            }
          } catch (error) {
            next(error);
          }
        });
        let revenue = await Revenue.findOne({
          date: moment().startOf('date').toISOString(),
        });
        if (!revenue) {
          revenue = new Revenue({
            date: moment().startOf('date').toISOString(),
          });
        }
        order_items.forEach(async (item) => {
          try {
            const product = await Product.findById(item.product_id._id);
            if (!product) {
              throw new Error({
                statusCode: 404,
                message: 'product.notFound',
                messages: { product: 'product not found' },
              });
            }
            product.sold_count += item.quantity;
            const stock = await Stock.findOne({
              product_id: item.product_id._id,
              size: item.size,
            });
            stock.stock -= item.quantity;
            const stocks = await Stock.find({ product_id: item.product_id._id });
            const total_stock = stocks.reduce(
              (item, total) => item.stock + total,
              0
            );
            if (total_stock <= 0) {
              product.out_of_stock = true;
            }
            await Product.findByIdAndUpdate(item.product_id._id, product);
            await Stock.findOneAndUpdate(
              { product_id: item.product_id._id, size: item.size },
              stock
            );
            const stock_history = new StockHistory({
              size: stock.size,
              product_id: stock.product_id._id,
              stock: item.quantity,
              price: item.price,
            });
            await stock_history.save();
            revenue.total_revenue += parseInt(item.quantity * item.price);
          } catch (error) {
            next(error);
          }
        });
        revenue.total_revenue += order.total_price ? order.total_price : 0;
        revenue.total_additional_fee += order.tax_price ? order.tax_price : 0 + order.shipping_price ? order.shipping_price : 0;
        revenue.total =
          revenue.total_revenue -
          revenue.total_additional_fee -
          revenue.total_expenditure ? revenue.total_expenditure : 0;
        await revenue.save();

        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_delivering',
          title: 'Đơn hàng',
          message: `Đơn hàng đã được giao cho đơn vị vận chuẩn.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        order.status = 'delivering';
        order.progress.push({
          status: 'delivering',
        });
        break;
      }
      case 'delivered': {
        if (order.status !== 'delivering') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeDelivered',
            messages: {
              order: 'only delivering order can be changed into delivered',
            },
          });
        }

        if (order.payment.paymentMethod === 'cash') {
          order.is_paid = true;
          order.paid_at = Date.now();
        }
        order.is_delivered = true;
        order.delivered_at = Date.now();
        order.status = 'delivered';
        order.progress.push({
          status: 'delivered',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_delivered',
          title: 'Đơn hàng',
          message: `Đơn hàng đã được giao thành công. Vui lòng xác nhận hoàn tất đơn hàng.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        break;
      }
      case 'shop_cancel': {
        if (order.status !== 'handling') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeCancel',
            messages: {
              order: 'only handling order can be changed into shop_cancel',
            },
          });
        }
        order.status = 'shop_cancel';
        order.progress.push({
          status: 'shop_cancel',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_shop_cancel',
          title: 'Đơn hàng',
          message: `Đơn hàng đã bị hủy bởi shop.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        break;
      }
      case 'lost_damage': {
        if (order.status !== 'delivering') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeLostDamage',
            messages: {
              order: 'only delivering order can be changed into lost_damage',
            },
          });
        }
        order.status = 'lost_damage';
        order.progress.push({
          status: 'lost_damage',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_lost_damage',
          title: 'Đơn hàng',
          message: `Đơn hàng đã bị thất lạc hoặc hư hỏng trong quá trình vận chuyển. Vui lòng đặt hàng lại.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);

        let revenue = await Revenue.findOne({
          date: moment().startOf('date').toISOString(),
        });
        if (!revenue) {
          revenue = new Revenue({
            date: moment().startOf('date').toISOString(),
          });
        }
        revenue.total_revenue -=
          order.tax_price + order.shipping_price + order.items_price;
        revenue.total_additional_fee += order.tax_price + order.shipping_price;
        revenue.total =
          revenue.total_revenue -
          revenue.total_additional_fee -
          revenue.total_expenditure;
        await revenue.save();
        break;
      }
      default:
        break;
    }

    order.updated_at = Date.now();
    order.updated_by = req.user._id;
    await Order.findByIdAndUpdate(req.params.id, order);
    const success = new Success({ data: order });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate([
      { path: 'shipping' },
      { path: 'order_items', populate: 'product_id' },
      { path: 'created_by' },
    ]);
    if (!order) {
      throw new Error({
        statusCode: 404,
        message: 'order.notFound',
        messages: { order: 'order not found' },
      });
    }
    switch (req.body.status) {
      case 'completed': {
        if (order.status !== 'delivered') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeCompleted',
            messages: {
              order: 'only delivered order can be changed into completed',
            },
          });
        }
        order.status = 'completed';
        order.progress.push({
          status: 'completed',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_completed',
          title: 'Đơn hàng',
          message: `Đơn hàng đã được hoàn tất.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        break;
      }
      case 'user_cancel': {
        if (order.status !== 'handling') {
          throw new Error({
            statusCode: 404,
            message: 'order.canBeCancel',
            messages: {
              order: 'only handling order can be changed into user_cancel',
            },
          });
        }
        order.status = 'user_cancel';
        order.progress.push({
          status: 'user_cancel',
        });
        const notification = new Notification({
          user_id: order.created_by._id,
          type: 'order_update_user_cancel',
          title: 'Đơn hàng',
          message: `Bạn đã hủy đơn hàng.`,
          object_id: order._id,
          onModel: 'Order',
        });
        const created_notification = await notification.save();
        //res.io.emit(order.created_by._id, created_notification);
        break;
      }
      default:
        break;
    }

    order.updated_at = Date.now();
    order.updated_by = req.user._id;
    await Order.findByIdAndUpdate(req.params.id, order);
    const success = new Success({ data: order });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
