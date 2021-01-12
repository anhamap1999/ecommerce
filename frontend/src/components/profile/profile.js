import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomePage from '../../pages/homepage';
import SlideBarProfile from './slidebar';
function ProfileScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <HomePage>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row">
          <div className="col-md-3">
            <SlideBarProfile userInfo={userInfo} />
          </div>
          <div className="col-md-9">{props.children}</div>
        </div>
      </div>
    </HomePage>
  );
}

export default ProfileScreen;
