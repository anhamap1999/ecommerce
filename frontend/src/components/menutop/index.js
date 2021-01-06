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
        Cookies.remove('userFulInfo')
        window.location.href = '/';
    }
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo ,loading,error } = userSignin;
   
    
    return <>
        <NavbarHeader className="navbarheader" id="header">
            <div className="container">
                <Row>
                    <Col md={{span:3}}>
                        <NavbarLogo ><NavbarLink to='/'>Home</NavbarLink></NavbarLogo>
                    </Col>
                    <Col md={{span:6}}>    
                        <NavbarMenu>
                            <NavbarUl >
        
                                <NavbarLi>
                                    <NavbarLink  to='/'>Service</NavbarLink>
                                </NavbarLi>
                                <NavbarLi>
                                    <NavbarLink  to='/products'>Shop</NavbarLink>
                                </NavbarLi>
                                
                            </NavbarUl>
                        </NavbarMenu>
                    </Col>    
                    <Col  md={{span:15}}>
                        <NavbarShop >
                           <Link to="/cart" > <i className="bx bx-shopping-bag"></i></Link>
                        </NavbarShop>
                        <NavbarLogin to={ userInfo ? "/profile/user" : "/signin"}>
                            {   
                                
                                userInfo ?
                                <div className="userInfo">
                                    <i>{userInfo.data.user.email}
                                        <ul>
                                            <li onClick={logout}>Sign Out</li>
                                            <li> <Link to="/profile/user">Profile</Link> </li>
                                            {
                                                    userInfo.data.user.isAdmin ?
                                                <>
                                                    
                                                     <li><Link  to="/admin/customer">Quản Trị Web</Link></li>
                                                    
                                                </>
                                                :
                                                " "
                                                }                               
                                        </ul>
                                    </i>                      
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