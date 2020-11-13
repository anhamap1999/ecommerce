import React from 'react';
import MenuTop from '../components/menu';

function HomePage(props) {
  return ( 
      <div className="bg-main">
        <MenuTop />
          <div className="main">
            {props.children}
          </div>
     </div>
  );
}


export default HomePage;
