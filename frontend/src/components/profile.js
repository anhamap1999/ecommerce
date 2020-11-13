import React from 'react';
import {Link} from 'react-router-dom'
import HomePage from '../pages/homepage';
function ProfileScreen() {

  return <HomePage>
      <div>
    <Link to="/createproduct">Create Product</Link>
    </div>
  </HomePage>
  
}


export default ProfileScreen;
