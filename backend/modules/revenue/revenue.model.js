const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const revenueSchema = new mongoose.Schema({
  total: { type: Number, required: true, default: 0 },
  total_order: { type: Number, required: true, default: 0 },
  total_revenue: { type: Number, required: true, default: 0 },
  total_expenditure: { type: Number, required: true, default: 0 },
  total_additional_fee: { type: Number, required: true, default: 0 },
  date: { type: String, required: true },
});
revenueSchema.plugin(paginate);
const revenueModel = mongoose.model('Revenue', revenueSchema);
module.exports = revenueModel;
