import Footer from '../components/footer';
import React, { useEffect } from 'react';
import NavbarTop from '../components/menutop/index';
// import socketIOClient from 'socket.io-client';
import { getCatogoryAll } from '../actions/categoryAction';
import { getConfig } from '../actions/configAction';
import { getProductCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { BackTop } from 'antd';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { getProvince } from '../actions/addressActions';

function HomePage(props) {
  // const socket = socketIOClient('localhost:5000', {transports: ['websocket']});

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatogoryAll());
    dispatch(getConfig());
    dispatch(getProductCart());
    dispatch(getProvince());
  }, []);
  return (
    <>
      <NavbarTop />
      <div className="main">{props.children}</div>
      <Footer />
      <BackTop>
        <div
          style={{
            background: '#9eb8be',
            width: 40,
            height: 40,
            textAlign: 'center',
            lineHeight: '40px',
            borderRadius: '50%',
          }}
        >
          <MdKeyboardArrowUp style={{ fontSize: '24px' }} />
        </div>
      </BackTop>
    </>
  );
}

export default HomePage;
