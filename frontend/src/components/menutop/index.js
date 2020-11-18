import React  from 'react';
import { NavbarHeader, NavbarLi, NavbarLink, NavbarLogin, NavbarLogo, NavbarMenu, NavbarShop,  NavbarUl } from './navbarMenu';
import {Col , Row } from 'antd';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
window.onscroll = () =>{
    const nav =document.getElementById('header')
    const pro =document.getElementById('product')
   
   if(nav){
    if(window.pageYOffset >= 100 )
    {
        nav.classList.add('bg-menu');
    }
    else{
        nav.classList.remove('bg-menu');
    }
   }
    if(window.pageYOffset >= 200 && pro)
    {
       pro.classList.add('product-ani');
    }
    
   
    
}
const NavbarTop = () => {
    const logout = (e) => {
        e.preventDefault();
        Cookies.remove('userInfo')
        window.location.href = '/';
    }
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return <>
        <NavbarHeader className="navbarheader" id="header">
            <div className="container">
                <Row>
                    <Col md={{span:5}}>
                        <NavbarLogo ><NavbarLink to='/'>Home</NavbarLink></NavbarLogo>
                    </Col>
                    <Col md={{span:16}}>    
                        <NavbarMenu>
                            <NavbarUl >
                                <NavbarLi>
                                    <NavbarLink to='/'>Home</NavbarLink>
                                </NavbarLi>
                                <NavbarLi>
                                    <NavbarLink  to='/'>Service</NavbarLink>
                                </NavbarLi>
                                <NavbarLi>
                                    <NavbarLink  to='/products'>Shop</NavbarLink>
                                </NavbarLi>
                                
                            </NavbarUl>
                        </NavbarMenu>
                    </Col>    
                    <Col  md={{span:3}}>
                        <NavbarShop to="/cart">
                            <i className="bx bx-shopping-bag"></i>
                            
                        </NavbarShop>
                        <NavbarLogin to={ userInfo ? "/profile" : "/signin"}>
                            {
                                userInfo ?
                                <div className="userInfo">
                                    <i> { userInfo.name }
                                        <ul>
                                            <li onClick={logout}>Sign Out</li>
                                            <li><Link to="/profile">Profile</Link></li>
                                            <li><Link  to="/categoryadd">category</Link></li>
                                        </ul>
                                    </i>
                                    <i>{userInfo.isAdmin ? "Admin" : ""}</i>
                                </div>
                                :
                                <i className="bx bx-user"></i>
                                
                            }
                        </NavbarLogin>

                    </Col>
                </Row>
            </div>
        </NavbarHeader>
    </>
}

export default NavbarTop ;