const  express = require('express');

import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRouter from './modules/users/user.router';
import categoryRouter from './modules/category/category.router';
import productRouter from './modules/products/product.router';
import orderRouter from './modules/order/order.router';
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl =config.DB_CONNECT;

mongoose.connect(mongodbUrl,{   
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true 
}).then(console.log("connected!"))
.catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use("/api/categories",categoryRouter);
app.use("/api/orders",orderRouter);
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

app.listen(5000,() => {
    console.log('server is running : 5000   ');
})
