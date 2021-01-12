const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  province_number: { type: Number, required: true },
  district_number: { type: Number, required: true },
  ward_number: { type: Number, required: true },
  text: { type: String, required: true },
  is_default: { type: Boolean, required: true, default: false },
  status: {
    type: String,
    required: true,
    enum: ['active', 'disabled'],
    default: 'active',
  },
  normalizedAddress: { type: String, required: false },
  created_by: { type: String, required: false },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
});
const deliveryAddressModel = mongoose.model(
  'DeliveryAddress',
  deliveryAddressSchema
);
module.exports = deliveryAddressModel;
