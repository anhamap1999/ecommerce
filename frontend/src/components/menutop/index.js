import React  from 'react';
import { NavbarHeader, NavbarLi, NavbarLink, NavbarLogin, NavbarLogo, NavbarMenu, NavbarShop,  NavbarUl } from './navbarMenu';
import {Col , Row } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatogoryAll } from '../../actions/categoryAction';
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
        localStorage.clear('userInfo')
        window.location.href = '/';
    }
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo ,loading,error } = userSignin;

    const listCategories = useSelector((state) => state.listCategories);
    const { categories ,loadingCat , errorCat } = listCategories;
    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatogoryAll())
        
        return () => { 
        }
    }, [])
 
    return <>
        <NavbarHeader className="navbarheader" id="header">
            <div className="container">
                <Row>
                    <Col md={{span:3}}>
                        <NavbarLogo ><NavbarLink to='/'>Shoes</NavbarLink></NavbarLogo>
                    </Col>
                   
                    <Col md={{span:12}}>    
                        <NavbarMenu>
                            <NavbarUl >
                            {
                                categories && categories.data && categories.data.map(category   =>
                                    category.type == 1 &&
                                 <NavbarLi className="other-custom">
                                     <div className="hover_show">
                                     <Link to={category.name} className='cool-link'>{category.name}
                                     
                                     </Link>
                                    {
                                         <ul>   
                                                {
                                                    categories && categories.data && categories.data.map(categoryEle=>
                                                         categoryEle.type == 2 && categoryEle.parent_id._id == category._id &&
                                                     <li>
                                                         <Link to={categoryEle.name} >{categoryEle.name}
                                                        
                                                         </Link>
                                                     </li>
                                                     )
                                                 }
                                         </ul> 
                                    }
                                     </div>
                                </NavbarLi>
                            )
                            }  
                            </NavbarUl>
                        </NavbarMenu>
                    </Col>    
                    <Col  md={{span:9}}>
                        <NavbarShop >
                           <Link to="/cart" > <i className="bx bx-shopping-bag"></i></Link>
                        </NavbarShop>
                        <NavbarLogin to={ userInfo ? "/profile/user" : "/signin"}>
                            {   
                                
                                userInfo  ?
                                <div className="userInfo">
                                    <i className="cool-link">{   userInfo.data.user.email}
                                        <ul className="hover_show" className="other-custom">
                                           
                                            <li> <Link to="/profile/user">Tài khoản của bạn</Link> </li>
                                            {
                                                    userInfo.data.user.isAdmin ?
                                                <>
                                                    
                                                     <li><Link  to="/admin/customer">Quản Trị Web</Link></li>
                                                    
                                                </>
                                                :
                                                " "
                                                }   
                                                 <li onClick={logout}><Link >Đăng xuất</Link></li>                            
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