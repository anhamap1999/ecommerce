import  Footer  from '../components/footer';
import React from 'react';
import BannerTop from '../components/banner';
import NavbarTop from '../components/menutop/index';
import ProductsNike from '../components/products';
import ProductsNew from '../components/productsNew';
import SendMail from '../components/sendmail';


function HomePage() {
  return ( 
        <>
          <NavbarTop />
          <BannerTop />
          <ProductsNike />
          <ProductsNew />
          <SendMail />
          <Footer />
        </>
     
  );
}


export default HomePage;
