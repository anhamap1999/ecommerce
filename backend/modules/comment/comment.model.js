const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const commentSchema = new mongoose.Schema({
  created_by: { type: mongoose.SchemaTypes.ObjectId, required: false, ref: 'User' },
  content: { type: String, required: true },
  images: { type: Array, required: false },
  product_id: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
  rating: { type: Number, required: true, default: 0, enum: [1, 2, 3, 4, 5] },
  likes_count: { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  reply_to: { type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' },
});
commentSchema.plugin(paginate);
const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;
