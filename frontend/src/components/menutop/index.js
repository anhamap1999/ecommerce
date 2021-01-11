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
import { Col, Row, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatogoryAll } from '../../actions/categoryAction';
import { changeFields, listProducts } from '../../actions/productActions';

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
  const { cartItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const categoryIndex =
    categories &&
    categories.findIndex(
      (item) =>
        location.pathname.replace('/products/', '') === item.pure_name ||
        (item.type === 2 &&
          location.pathname.replace('/products/', '') ===
            item.parent_id.pure_name + '/' + item.pure_name)
    );
  const focusCategory = categories[categoryIndex]
    ? categories[categoryIndex]
    : {};

  const { query } = useSelector((state) => state.productList);

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
    if (key === 'category_id') {
      dispatch(
        changeFields({
          'query.category_id': value,
          'query.brand': '',
          'query.page': 1,
          'query.sort': '-created_at',
          'query.price': [100000, 3000000],
        })
      );
      dispatch(
        listProducts({
          category_id: value,
          brand: '',
          page: 1,
          sort: '-created_at',
          price: [100000, 3000000],
        })
      );
    } else {
      dispatch(
        changeFields({
          'query.category_id': '',
          'query.brand': value,
          'query.page': 1,
          'query.sort': '-created_at',
          'query.price': [100000, 3000000],
        })
      );
      dispatch(
        listProducts({
          category_id: '',
          brand: value,
          page: 1,
          sort: '-created_at',
          price: [100000, 3000000],
        })
      );
    }
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
                {loadingCat || loadingConfig ? (
                  <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                ) : null}
                <NavbarUl>
                  {categories && categories.length
                    ? categories.map(
                        (category) =>
                          category.type === 1 && (
                            <NavbarLi
                              className={`other-custom ${
                                focusCategory._id === category._id ||
                                (focusCategory.type === 2 &&
                                  focusCategory.parent_id._id === category._id)
                                  ? 'other-custom-ul-li-focus'
                                  : ''
                              }`}
                              key={category._id}
                            >
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
                                    {categories && categories.length
                                      ? categories.map(
                                          (categoryEle) =>
                                            categoryEle.type === 2 &&
                                            categoryEle.parent_id._id ===
                                              category._id && (
                                              <li
                                                className={
                                                  focusCategory._id ===
                                                  categoryEle._id
                                                    ? 'cool-link-focus'
                                                    : ''
                                                }
                                              >
                                                <Link
                                                  to={`/products/${category.pure_name}/${categoryEle.pure_name}`}
                                                  onClick={() =>
                                                    onClickItem(
                                                      'category_id',
                                                      categoryEle._id
                                                    )
                                                  }
                                                >
                                                  {console.log(
                                                    'FOCUS',
                                                    focusCategory.name,
                                                    categoryEle.name
                                                  )}
                                                  {categoryEle.name}
                                                </Link>
                                              </li>
                                            )
                                        )
                                      : null}
                                  </ul>
                                }
                              </div>
                            </NavbarLi>
                          )
                      )
                    : null}
                  {brands && brands.length ? (
                    <NavbarLi
                      className={`other-custom ${
                        query.brand && query.brand.length > 0
                          ? 'other-custom-ul-li-focus'
                          : ''
                      }`}
                      key={'brand'}
                    >
                      <div className='hover_show'>
                        {/* <Link to={`/products`} className='cool-link'> */}
                        {'Thương hiệu'}
                        {/* </Link> */}
                        {
                          <ul>
                            {brands.map((brand) => (
                              <li
                                className={
                                  query && query.brand === brand
                                    ? 'cool-link-focus'
                                    : ''
                                }
                              >
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
                  ) : null}
                </NavbarUl>
              </NavbarMenu>
            </Col>
            <Col md={{ span: 9 }}>
              <NavbarShop>
                <Link to='/cart'>
                  {/* {' '} */}
              <Badge count={cartItems && cartItems.length} className='ant-badge-shopping'>
                  
                  <i className='bx bx-shopping-bag'></i>
                  </Badge>
                </Link>
              </NavbarShop>
              <NavbarLogin to={userInfo ? '/profile/user' : '/signin'}>
                {userInfo && userInfo.user ? (
                  <div className='userInfo'>
                    <i className='cool-link'>
                      {userInfo.user.email}
                      <ul className='hover_show other-custom'>
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
