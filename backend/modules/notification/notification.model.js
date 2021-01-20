const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'order_add',
      'order_update_picking',
      'order_update_delivering',
      'order_update_completed',
      'order_update_user_cancel',
      'order_update_shop_cancel',
      'order_update_lost_damage',
      'comment_add',
      'cart_add',
      'auth_reset_password',
      'product_add',
      'staff_add',
      'stock_update',
      'user_change_password',
      'category_add',
      'admin_add',
      'order_update_delivered'
    ],
  },
  is_read: { type: Boolean, required: true, default: false },
  object_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    refPath: 'onModel',
  },
  onModel: {
    type: String,
    required: false,
    enum: ['Order', 'Comment', 'Product', 'Cart', 'User', 'Stock', 'Category'],
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  for: {
    type: String,
    required: true,
    default: 'customer',
    enum: ['customer', 'staff', 'admin'],
  },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
});
notificationSchema.plugin(paginate);
const notificationModel = mongoose.model('Notification', notificationSchema);
module.exports = notificationModel;
