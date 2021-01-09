import  Footer  from '../components/footer';
import React from 'react';
import NavbarTop from '../components/menutop/index';
import socketIOClient from 'socket.io-client';


function HomePage(props) {
      const socket = socketIOClient('localhost:5000', {transports: ['websocket']});

      // var socket = io('localhost:5000', {transports: ['websocket']});
      // socket.on('connection', () => {
      //   console.log('IO CONNECTION');
      // });
      // socket.connect();
      // var socket = io.connect('localhost:5000');
      // console.log('IO', socket);
      // socket.on('get products', () => console.log('get products'));

      // socket.on('chat message', function(msg) {
      //   console.log('RECEIVE', msg);
      // });
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
