const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const stockHistorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: false,
  },
  stock: { type: Number, required: true, default: 0 },
  size: { type: Number, required: false },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  created_by: { type: String, required: false },
  type: { type: String, default: 'export', enum: ['import', 'export'] },
});
stockHistorySchema.plugin(paginate);
const stockHistoryModel = mongoose.model('StockHistory', stockHistorySchema);
module.exports = stockHistoryModel;
