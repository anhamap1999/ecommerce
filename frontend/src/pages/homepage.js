import React from 'react';
import BannerTop from '../components/banner';
import NavbarTop from '../components/menutop/index';
import ProductsNike from '../components/products';


function HomePage() {
  return ( 
        <>
          <NavbarTop />
          <BannerTop />
          <ProductsNike />
        </>
     
  );
}


export default HomePage;
