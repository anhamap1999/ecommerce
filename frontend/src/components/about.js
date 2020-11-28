import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from '../pages/homepage';
import BannerTop from './banner';
import ProductsNike from './products';
import ProductsNew from './productsNew';
  
function AboutScreen() {
 
  return <div>
    
    <HomePage>
          <BannerTop />
          <ProductsNike />
          <ProductsNew />
    </HomePage>
  </div>
  
}


export default AboutScreen;
