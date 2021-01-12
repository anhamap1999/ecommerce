const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./commons/config');
const mongoose = require('mongoose');
const userRouter = require('./modules/users/user.router');
const productRouter = require('./modules/products/product.router');
const bodyParser = require('body-parser');
const authRouter = require('./modules/auth/auth.router');
const categoryRouter = require('./modules/category/category.router');
const addressRouter = require('./modules/address/address.router');
const deliveryAddressRouter = require('./modules/delivery_address/delivery_address.router');
const configRouter = require('./modules/config/config.router');
const searchRouter = require('./modules/search/search.router');
const bankAccountRouter = require('./modules/bank_account/bank_account.router');
const commentRouter = require('./modules/comment/comment.router');
const banksRouter = require('./modules/banks/banks.router');
const adminRouter = require('./modules/admin/admin.router');
const  orderRouter = require('./modules/order/order.router');
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
    useFindAndModify: false
  })
  .then(console.log('connected!'))
  .catch((error) => console.log(error.reason));




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(multer().array());
//app.use(express.static('public'));

app.use(express.json());

app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders",orderRouter);
app.use("/api/users", userRouter);
app.use("/api/products",productRouter);
app.use("/api/address", addressRouter);
app.use("/api/delivery-address", deliveryAddressRouter);
app.use("/api/config", configRouter);
app.use("/api/search", searchRouter);
app.use("/api/bank-account", bankAccountRouter);
app.use("/api/comment", commentRouter);
app.use("/api/banks", banksRouter);
app.use("/api/admin", adminRouter);

app.listen(5000, () => {
  console.log('server is running : 5000   ');
});
