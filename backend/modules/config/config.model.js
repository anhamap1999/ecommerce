const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const configSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: mongoose.SchemaTypes.Mixed, required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
});
configSchema.plugin(paginate);
const configModel = mongoose.model('Config', configSchema);
module.exports = configModel;
