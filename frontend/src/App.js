import React from 'react';
import './App.css';
// import './style.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import AboutScreen from './components/about';
import ProductScreen from './components/product';
import DetailsScreen from './components/detailsproduct';
import RegisterScreen from './components/register';
import CreateProductScreen from './components/createProduct';
import SigninScreen from './components/signin';
import ProfileUserScreen from './components/profile/profileUser';
import OrderUserScreen from './components/profile/orderUser';
import BankingUserScreen from './components/profile/bankingUser';
import PlaceUserScreen from './components/profile/placeUser';

import CustomerAdminScreen from './admin/customer';
import ProductAdminScreen from './admin/product';
import OrderAdminScreen from './admin/order';
import StaffAdminScreen from './admin/staff';
import CategoryAdminScreen from './admin/category';
import CartScreen from './components/cart';
import StorageAdminScreen from './admin/storage';
import RuleAdminScreen from './admin/rule';
import PlaceOrderScreen from './components/placeorder';
import ShippingScreen from './components/shipping';
import PaymentScreen from './components/payment';
import SearchScreen from './components/search';
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={AboutScreen} />
      <Route path="/products" component={ProductScreen} />
      <Route path="/product/:id" component={DetailsScreen} />
      <Route path="/cart/" component={CartScreen} />
      <Route path="/cart/:id" component={CartScreen} />
      <Route path="/profile/user" component={ProfileUserScreen} />
      <Route path="/profile/place" component={PlaceUserScreen} />
      <Route path="/profile/payment" component={BankingUserScreen} />
      <Route path="/profile/order" component={OrderUserScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/createproduct" component={CreateProductScreen} />
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/place-order" component={PlaceOrderScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/search" component={SearchScreen} />

      <Route path="/admin/customer" component={CustomerAdminScreen} />
      <Route path="/admin/products" component={ProductAdminScreen} />
      <Route path="/admin/orders" component={OrderAdminScreen} />
      <Route path="/admin/staff" component={StaffAdminScreen} />
      <Route path="/admin/category" component={CategoryAdminScreen} />
      <Route path="/admin/rule" component={RuleAdminScreen} />
      <Route path="/admin/storage" component={StorageAdminScreen} />
    </BrowserRouter>
  );
}

export default App;
