const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
});

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  province_number: { type: Number, required: true },
  bank_number: { type: Number, required: true },
  province_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Province'},
  bank_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Bank'}
});

const bankModel = mongoose.model('Bank', bankSchema);
const branchModel = mongoose.model('Branch', branchSchema);
module.exports = {
  Bank: bankModel,
  Branch: branchModel
};
