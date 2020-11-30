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
    type: String,
    required: false,
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
  createdAt: { type: Date, default: Date.now(), required: true },
});
CategorySchema.plugin(paginate);
const categoryModel = mongoose.model('category', CategorySchema);
module.exports = categoryModel;
