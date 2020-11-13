import React from 'react';
import { NavbarHeader, NavbarLi, NavbarLink, NavbarLogo, NavbarMenu, NavbarShop,  NavbarUl } from './navbarMenu';
import {Col , Row } from 'antd';

const sections =document.querySelectorAll("id");

// const scrollActive = () => {
//     const scrollY =window.pageYOffset
    
//     sections.forEach(current=>{
//         const sectionHeight = current.offsetHeight;
//         const sectionTop = current.offsetTop - 100;
//         const sectionId =current.getAttribute('id')

//         if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
//             document.querySelector('.navbarul a[href*='+ sectionId +']').classList.add('activemenu')
//         }
//         else{
//             document.querySelector('.navbarul a[href*='+ sectionId +']').classList.remove('activemenu')
//         };
//     })
// }   
// window.addEventListener('scroll',scrollActive);
window.onscroll = () =>{
    const nav =document.getElementById('header')
    console.log("a",window.pageYOffset)
    if(window.pageYOffset >= 100)
    {
        nav.classList.add('bg-menu');
    }
    else{
        nav.classList.remove('bg-menu');
    }
}
const NavbarTop = () => {
    
    return <>
        <NavbarHeader className="navbarheader" id="header">
            <div className="container">
                <Row>
                    <Col md={{span:5}}>
                        <NavbarLogo>Ecom</NavbarLogo>
                    </Col>
                    <Col md={{span:18}}>    
                        <NavbarMenu>
                            <NavbarUl >
                                <NavbarLi>
                                    <NavbarLink>Home</NavbarLink>
                                </NavbarLi>
                                <NavbarLi>
                                    <NavbarLink>Service</NavbarLink>
                                </NavbarLi>
                                <NavbarLi>
                                    <NavbarLink>Shop</NavbarLink>
                                </NavbarLi>
                                
                            </NavbarUl>
                        </NavbarMenu>
                    </Col>    
                    <Col  md={{span:1}}>
                        <NavbarShop>
                            <i className="bx bx-shopping-bag"></i>
                        </NavbarShop>
                    </Col>
                </Row>
            </div>
        </NavbarHeader>
    </>
}

export default NavbarTop ;