// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema;

const CategorySchema = new schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  pure_name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  type: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  parent_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: 'Category',
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'disabled'],
    required: true,
  },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, required: false },
  created_by: { type: String, required: false },
  updated_by: { type: String, required: false },
});
CategorySchema.plugin(paginate);
const categoryModel = mongoose.model('Category', CategorySchema);
module.exports = categoryModel;
