const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
// const shippingSchema = {
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
// };

const paymentSchema = {
  paymentMethod: { type: String, required: true, enum: ['cash', ''] },
  bank_account: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'BankAccount',
    required: false,
  },
};

const orderItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
  size: { type: Number, required: true },
});

const progressSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: 'handling',
    enum: [
      'handling',
      'picking',
      'delivering',
      'delivered',
      'completed',
      'user_cancel',
      'shop_cancel',
      'lost_damage',
    ],
  },
  updated_at: { type: Date, default: Date.now(), required: true },
});

const orderSchema = new mongoose.Schema(
  {
    order_items: [orderItemSchema],
    shipping: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'DeliveryAddress',
      required: true,
    },
    payment: paymentSchema,
    items_price: { type: Number },
    tax_price: { type: Number },
    shipping_price: { type: Number },
    total_price: { type: Number },
    is_paid: { type: Boolean, default: false },
    paid_at: { type: Date },
    is_delivered: { type: Boolean, default: false },
    delivered_at: { type: Date },
    created_at: { type: Date, default: Date.now(), required: true },
    updated_at: { type: Date, required: false },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: 'User',
    },
    updated_by: { type: String, required: false },
    status: {
      type: String,
      required: true,
      default: 'handling',
      enum: [
        'handling',
        'picking',
        'delivering',
        'delivered',
        'completed',
        'user_cancel',
        'shop_cancel',
        'lost_damage',
      ],
    },
    progress: [progressSchema]
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(paginate);
const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
