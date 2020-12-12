import React from 'react';
import './App.css';

import {BrowserRouter,Route} from 'react-router-dom'

import HomePage from './pages/homepage';
import SigninPage from './pages/signpage';
import AboutScreen from './components/about';
import ProductScreen from './components/product';
import DetailsScreen from './components/detailsproduct';
import CartScreen from './components/cart';
import ProfileScreen from './components/profile/profile';
import RegisterScreen from './components/register';
import CreateProductScreen from './components/createProduct';
import ShippingScreen from './components/shipping';
import PaymentSreen from './components/payment';
import PlaceOrderScreen from './components/placeorder';
import SigninScreen from './components/signin';
import AddCategoryScreen from './components/category';
import OrdersScreen from './components/orders';
import OrderScreen from './components/order';
import ProfileUserScreen from './components/profile/profileUser';

function App() {
  
  return (
    <BrowserRouter>
     
      <Route exact path='/' component={AboutScreen} />
      <Route path='/products' component={ProductScreen} />
      <Route path='/product/:id' component={DetailsScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/profile/user'  component={ProfileUserScreen} />
      <Route path='/profile/payment'  component={ProfileUserScreen} />
      <Route path='/profile/order'  component={ProfileUserScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/createproduct' component={CreateProductScreen} />
      <Route path='/signin'  component={SigninScreen}></Route>
      <Route path='/shipping'  component={ShippingScreen}></Route>
      <Route path='/payment'  component={PaymentSreen}></Route>
      <Route path='/placeorder'  component={PlaceOrderScreen}></Route>
      <Route path='/categoryadd'  component={AddCategoryScreen}></Route>
      <Route path='/orders'  component={OrdersScreen}></Route>
      <Route path="/order/:id" component={OrderScreen} />
    </BrowserRouter>
  );
}


export default App;
