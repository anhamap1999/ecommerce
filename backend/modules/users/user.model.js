// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  username: {
    type: String,
    minlength: 8,
    maxlength: 30,
    // required: true,
    index: true,
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username must only contains alphabet, number, underscore and dot. Underscore and dot can not be inside, at the beginning and the end.',
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    maxlength: 50,
    lowercase: true,
    match: [/[\w]+?@[\w]+?\.[a-z]{2,4}/, 'Email must have correct format!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  phone_number: {
    type: String,
    maxlength: 10,
    // match: [/^0[0-9]{8}$/, 'Phone number must have correct format!'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'disabled'],
  },
  role: {
    type: String,
    default: 'customer',
    enum: ['customer', 'admin'],
  },
  full_name: {
    type: String,
    maxlength: 50,
  },
  gender: {
    type: String,
    default: 'female',
    enum: ['female', 'male', 'other'],
  },
  birthday: {
    type: String,
  },
  access_tokens: [TokenSchema],
  version: {
    type: Number,
    default: 0,
  },
});
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
