const mongoose = require('mongoose');
// const paginate = require('mongoose-paginate-v2');

const cartSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Product',
  },
  size: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// const cartDetailSchema = new mongoose.Schema({
//   product_id: { type: String, required: true },
//   product: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
//   price: {type: Number, required: true },
//   quantity: {type: Number, required: true },
//   created_at: { type: Date, default: Date.now(), required: true },
//   updated_at: { type: Date, required: false },
// })
// productSchema.plugin(paginate);
const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel;
