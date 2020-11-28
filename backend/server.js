const express = require('express');
const dotenv = require('dotenv');
const config = require('./commons/config');
const mongoose = require('mongoose');
const userRouter = require('./modules/users/user.router');
const productRouter = require('./modules/products/product.router');
const bodyParser = require('body-parser');
const authRouter = require('./modules/auth/auth.router');

// import dotenv from 'dotenv';
// import config from './config';
// import mongoose from 'mongoose';
// import userRouter from './modules/users/user.router';
// import productRouter from './modules/products/product.router';
// import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('connected!'))
  .catch((error) => console.log(error.reason));




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(multer().array());
//app.use(express.static('public'));

app.use(express.json());

app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use("/api/categories",categoryRouter);
app.use("/api/orders",orderRouter);
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

app.listen(5000, () => {
  console.log('server is running : 5000   ');
});
