const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  code: { type: String, required: true }
});

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  province_number: { type: Number, required: true },
});

const wardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  province_number: { type: Number, required: true },
  district_number: { type: Number, required: true },
});

const provinceModel = mongoose.model('Province', provinceSchema);
const districtModel = mongoose.model('District', districtSchema);
const wardModel = mongoose.model('Ward', wardSchema);
module.exports = {
  Province: provinceModel,
  District: districtModel,
  Ward: wardModel
};
