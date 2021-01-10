import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { listProducts, changeFields } from '../actions/productActions';
// import axios from 'axios';
import HomePage from '../pages/homepage';
import { Pagination, Row, Col, Card, Select, Radio, Empty, Button, Tooltip } from 'antd';
const sortOptions = [
  { label: 'Giá: tăng dần', value: 'price' },
  { label: 'Giá: giảm dần', value: '-price' },
  { label: 'Tên: A-Z', value: 'name' },
  { label: 'Tên: Z-A', value: '-name' },
  { label: 'Cũ nhất', value: 'created_at' },
  { label: 'Mới nhất', value: '-created_at' },
  { label: 'Bán chạy nhất', value: '-sold_counts' },
];
function ProductScreen(props) {
  const productList = useSelector((state) => state.productList);
  const {
    products,
    loading,
    error,
    total,
    totalPage,
    page,
    query,
  } = productList;
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);

  // const history = useHistory();
  // const location = useLocation();
  // const redirect = location.search ? location.search.split('=')[1] : '/';
  // console.log('QUERY', query)
  const { category_id, brand, color, size, sort, limit } = query;

  const { configs } = useSelector((state) => state.config);
  const sizeIndex = configs && configs.findIndex((item) => item.key === 'size');
  const sizes = configs[sizeIndex] ? configs[sizeIndex].value : [];

  const colorIndex = configs && configs.findIndex((item) => item.key === 'color');
  const colors = configs[colorIndex] ? configs[colorIndex].value : [];
  // const { page } = {};
  const onPaginationChange = (page, limit) => {
    dispatch(listProducts({ page, limit }));
  };
  console.log('QUERY', query);
  useEffect(() => {
    dispatch(
      changeFields({
        'query.page': 1,
        'query.limit': 30,
        'query.sort': '-created_at',
      })
    );
    return () => {
      dispatch(
        changeFields({
          query: {},
          products: [],
          total: 0,
          totalPage: 1,
          page: 1,
        })
      );
    };
  }, []);
  useEffect(() => {
    dispatch(listProducts(query));
    // return () => {};
  }, [reload]);
  console.log('products', products);

  const onChangeFilter = (key, value) => {
    dispatch(changeFields({ [`query.${key}`]: value }));
    setReload(!reload);
  };
  const clearFilter = () => {
    dispatch(
      changeFields({
        query: {
          ...query,
          sort: '-created_at',
          size: 0,
          brand: '',
          color: '',
        },
      })
    );
    setReload(!reload);
  };
  return (
    <HomePage>
      <Row gutter={[8, 16]} style={{ marginTop: '100px' }}>
        <Col md={{ span: 6 }}>
          <Card>
            <div>
              <Button value='Đặt lại' type='primary' onClick={clearFilter}>Đặt lại</Button>
            </div>
            <div>Sắp xếp theo:</div>
            <Select
              value={sort}
              options={sortOptions}
              onChange={(value) => onChangeFilter('sort', value)}
              style={{ width: 200 }}
            />

            <div>Size</div>
            <Radio.Group
              value={size}
              onChange={(e) => onChangeFilter('size', e.target.value)}
            >
              {sizes &&
                sizes.length &&
                sizes.map((item) => (
                  <Radio.Button
                    value={item}
                    style={{ margin: '5px', width: '50px' }}
                  >
                    {item}
                  </Radio.Button>
                ))}
            </Radio.Group>

            <div>Màu sắc</div>
            <Radio.Group
              value={color}
              onChange={(e) => onChangeFilter('color', e.target.value)}
              className='color-radio'
            >
              {colors &&
                Object.entries(colors).map((item) => (
                  <Tooltip title={item[1]}>
                  <Radio.Button
                    value={item[0]}
                    style={{ margin: '5px', width: '50px' }}
                  >
                    <span className='color-circle' style={{ backgroundColor: item[0] }}></span>
                    {/* {item[1]} */}
                  </Radio.Button>
                  </Tooltip>
                ))}
            </Radio.Group>
          </Card>
        </Col>
        <Col md={{ span: 18 }}>
          {loading ? (
            <div className='container'>
              <div className='spinner-border text-primary' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ul className='container'>
              <div className='row'>
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <div className='col-md-4' style={{ margin: '10px 0' }}>
                      <li>
                        <div className='productmain'>
                          <div className='product'>
                            <div className='product-img'>
                              <img src='' alt='giay'></img>
                            </div>
                            <div className='product-text'>
                              <h3> {product.name} </h3>
                              <Link to={'/product/' + product._id}>
                                {' '}
                                <button> Mua ngay </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                {products && !products.length && (
                  <Empty
                    description='Không có sản phẩm'
                    style={{ width: '-webkit-fill-available' }}
                  />
                )}
                {products && (
                  <div className='container' style={{ textAlign: 'right' }}>
                    <Pagination
                      current={page}
                      total={total}
                      pageSize={limit ? limit : 30}
                      pageSizeOptions={[10, 20, 30]}
                      onChange={onPaginationChange}
                      showTotal={(total) => `Có ${total} sản phẩm`}
                      showSizeChanger
                    />
                  </div>
                )}
              </div>
            </ul>
          )}
        </Col>
      </Row>
    </HomePage>
  );
}

export default ProductScreen;
