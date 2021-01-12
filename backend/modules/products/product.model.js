const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pure_name: { type: String, required: true },
  images: { type: Array, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  stock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  user_id: { type: String, require: true },
  category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
  },
  thumbnail: { type: String, required: true },
  likes_count: { type: Number, required: true, default: 0 },
  comments_count: { type: Number, required: true, default: 0 },
  shares_count: { type: Number, required: true, default: 0 },
  views_count: { type: Number, required: true, default: 0 },
  sold_count: { type: Number, required: true, default: 0 },
  discount_rate: { type: Number, required: true, default: 0 },
  SKU: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'disabled'],
    default: 'pending',
  },
  attributes: { type: Array, required: false },
  color: { type: String, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
  size: { type: [Number], required: true },
  out_of_stock: { type: Boolean, required: true, default: true },
});
// productSchema.indexes()
productSchema.index({ name: 'text' });
productSchema.plugin(paginate);
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
