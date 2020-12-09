const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  account_number: { type: String, required: true },
  account_name: { type: String, required: true },
  bank: { type: String, required: true },
  branch: { type: String, required: true },
  created_by: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ['active', 'disabled'],
    default: 'active',
  },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: String, required: false }
});

const bankAccountModel = mongoose.model('BankAccount', bankAccountSchema);
module.exports = bankAccountModel;
