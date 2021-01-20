const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const stockSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
  stock: { type: Number, required: true, default: 0 },
  size: { type: Number, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
});
stockSchema.plugin(paginate);
const stockModel = mongoose.model('Stock', stockSchema);
module.exports = stockModel;
