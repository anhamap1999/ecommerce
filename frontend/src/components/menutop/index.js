import React from 'react';
import {
  NavbarHeader,
  NavbarLi,
  NavbarLink,
  NavbarLogin,
  NavbarLogo,
  NavbarMenu,
  NavbarShop,
  NavbarUl,
} from './navbarMenu';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatogoryAll } from '../../actions/categoryAction';
import { changeFields } from '../../actions/productActions';

window.onscroll = () => {
  const nav = document.getElementById('header');
  const pro = document.getElementById('product');

  if (nav) {
    if (window.pageYOffset >= 100) {
      nav.classList.add('bg-menu');
    } else {
      nav.classList.remove('bg-menu');
    }
  }
  if (window.pageYOffset >= 200 && pro) {
    pro.classList.add('product-ani');
  }
};
const NavbarTop = () => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear('userInfo');
    window.location.href = '/';
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const listCategories = useSelector((state) => state.listCategories);
  const { categories, loading: loadingCat, error: errorCat } = listCategories;

  const config = useSelector((state) => state.config);
  const { configs, loading: loadingConfig, error: errorConfig } = config;
  const index = configs && configs.findIndex((item) => item.key === 'brand');
  const brands = configs[index] ? configs[index].value : [];

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getCatogoryAll());
    // dispatch(getConfig());

    return () => {};
  }, []);

  const onClickItem = (key, value) => {
    dispatch(
      changeFields({
        query: {
          [key]: value,
        },
      })
    );
  };

  return (
    <>
      <NavbarHeader className='navbarheader' id='header'>
        <div className='container'>
          <Row>
            <Col md={{ span: 3 }}>
              <NavbarLogo>
                <NavbarLink to='/'>Shoes</NavbarLink>
              </NavbarLogo>
            </Col>

            <Col md={{ span: 12 }}>
              <NavbarMenu>
                {(loadingCat || loadingConfig) && (
                  <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                )}
                <NavbarUl>
                  {categories &&
                    categories.length &&
                    categories.map(
                      (category) =>
                        category.type === 1 && (
                          <NavbarLi className='other-custom' key={category._id}>
                            <div className='hover_show'>
                              <Link
                                to={`/products/${category.pure_name}`}
                                className='cool-link'
                                onClick={() =>
                                  onClickItem('category_id', category._id)
                                }
                              >
                                {category.name}
                              </Link>
                              {
                                <ul>
                                  {categories &&
                                    categories.length &&
                                    categories.map(
                                      (categoryEle) =>
                                        categoryEle.type === 2 &&
                                        categoryEle.parent_id._id ===
                                          category._id && (
                                          <li>
                                            <Link
                                              to={`/products/${category.pure_name}/${categoryEle.pure_name}`}
                                              onClick={() =>
                                                onClickItem(
                                                  'category_id',
                                                  categoryEle._id
                                                )
                                              }
                                            >
                                              {categoryEle.name}
                                            </Link>
                                          </li>
                                        )
                                    )}
                                </ul>
                              }
                            </div>
                          </NavbarLi>
                        )
                    )}
                  {brands && brands.length && (
                    <NavbarLi className='other-custom' key={'brand'}>
                      <div className='hover_show'>
                        {/* <Link to={`/products`} className='cool-link'> */}
                        {'Thương hiệu'}
                        {/* </Link> */}
                        {
                          <ul>
                            {brands.map((brand) => (
                              <li>
                                <Link
                                  to={`/products`}
                                  onClick={() => onClickItem('brand', brand)}
                                >
                                  {brand}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        }
                      </div>
                    </NavbarLi>
                  )}
                </NavbarUl>
              </NavbarMenu>
            </Col>
            <Col md={{ span: 9 }}>
              <NavbarShop>
                <Link to='/cart'>
                  {' '}
                  <i className='bx bx-shopping-bag'></i>
                </Link>
              </NavbarShop>
              <NavbarLogin to={userInfo ? '/profile/user' : '/signin'}>
                {userInfo && userInfo.user ? (
                  <div className='userInfo'>
                    <i className='cool-link'>
                      {userInfo.user.email}
                      <ul className='hover_show' className='other-custom'>
                        <li>
                          {' '}
                          <Link to='/profile/user'>Tài khoản của bạn</Link>{' '}
                        </li>
                        {userInfo.user.isAdmin ? (
                          <>
                            <li>
                              <Link to='/admin/customer'>Quản Trị Web</Link>
                            </li>
                          </>
                        ) : (
                          ' '
                        )}
                        <li onClick={logout}>
                          <Link>Đăng xuất</Link>
                        </li>
                      </ul>
                    </i>
                  </div>
                ) : (
                  <i className='bx bx-user'></i>
                )}
              </NavbarLogin>
            </Col>
          </Row>
        </div>
      </NavbarHeader>
    </>
  );
};

export default NavbarTop;
