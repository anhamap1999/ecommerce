import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
function MenuTop() {
    const userSignin = useSelector(state => state.userSignin );
    const {userInfo} = userSignin ;
  return (
    <div className="header ">
        <div className="menu">
            <nav className="navbar navbar-expand navbar-light bg-faded">
                
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    
                    <li className="nav-item active">
                        <Link to="/" className="navbar-brand logo">AL</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link" >Product</Link>
                    </li>
                   
                    <li className="nav-item user_menutop">
                            {
                                userInfo ?
                                
                                <Link to="/profile" className="nav-link" >{userInfo.name}</Link>
                                :
                                <Link to="/signin" className="nav-link" >Sign In</Link>
                            }
                    </li>
                </ul>
            </nav>
        </div>        
    </div>
  );
}


export default MenuTop;
