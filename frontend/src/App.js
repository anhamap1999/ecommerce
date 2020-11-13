import React from 'react';
import './App.css';

import {BrowserRouter,Route} from 'react-router-dom'

import HomePage from './pages/homepage';
import SigninPage from './pages/signpage';
import AboutScreen from './components/about';
import ProductScreen from './components/product';
import DetailsScreen from './components/detailsproduct';
import CartScreen from './components/cart';
import ProfileScreen from './components/profile';
import RegisterScreen from './components/register';
import CreateProductScreen from './components/createProduct';
import ShippingScreen from './components/shipping';
import PaymentSreen from './components/payment';
import PlaceOrderScreen from './components/placeorder';

function App() {
  
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route path='/about' component={AboutScreen} />
      <Route path='/products' component={ProductScreen} />
      <Route path='/product/:id' component={DetailsScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/createproduct' component={CreateProductScreen} />
      <Route path='/signin'  component={SigninPage}></Route>
      <Route path='/shipping'  component={ShippingScreen}></Route>
      <Route path='/payment'  component={PaymentSreen}></Route>
      <Route path='/placeorder'  component={PlaceOrderScreen}></Route>
    </BrowserRouter>
  );
}


export default App;
