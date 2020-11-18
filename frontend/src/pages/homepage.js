import  Footer  from '../components/footer';
import React from 'react';
import NavbarTop from '../components/menutop/index';


function HomePage(props) {
  return ( 
        <>
          <NavbarTop />
            <div className="main">
              {
                props.children
              }
            </div>
          <Footer />
        </>
     
  );
}


export default HomePage;
