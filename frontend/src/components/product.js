import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { listProducts, changeFields } from '../actions/productActions';
// import axios from 'axios';
import HomePage from '../pages/homepage';
import {
  Pagination,
  Row,
  Col,
  Card,
  Select,
  Radio,
  Empty,
  Button,
  Tooltip,
  Slider,
  Tabs,
} from 'antd';
import utils from '../modules/utils';
const { TabPane } = Tabs;
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
  const { products, loading, error, total, totalPage, query } = productList;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.listCategories);

  const [reload, setReload] = useState(false);

  // const history = useHistory();
  // const location = useLocation();
  // const redirect = location.search ? location.search.split('=')[1] : '/';
  // console.log('QUERY', query)
  const { category_id, brand, price, color, size, sort, limit, page } = query;

  const { configs } = useSelector((state) => state.config);
  const sizeIndex = configs && configs.findIndex((item) => item.key === 'size');
  const sizes = configs[sizeIndex] ? configs[sizeIndex].value : [];

  const colorIndex =
    configs && configs.findIndex((item) => item.key === 'color');
  const colors = configs[colorIndex] ? configs[colorIndex].value : [];

  const categoryIndex =
    categories && categories.findIndex((item) => item._id === category_id);
  const category = categories[categoryIndex] ? categories[categoryIndex] : {};
  // const { page } = {};
  const onPaginationChange = (page, limit) => {
    dispatch(changeFields({ 'query.page': page, 'query.limit': limit }));
    setReload(!reload);
  };
  console.log('QUERY', query);
  useEffect(() => {
    dispatch(
      changeFields({
        'query.page': 1,
        'query.limit': 30,
        'query.sort': '-created_at',
        'query.price': [100000, 3000000],
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
    dispatch(changeFields({ [`query.${key}`]: value, page: 1 }));
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
      <Row gutter={[8, 16]}>
        <Col md={{ span: 6 }}></Col>
        <Col md={{ span: 18 }}>
          <Row>
            <Col span={24}>
              <Tabs
                className="custom-tabs"
                activeKey={
                  category.type === 1
                    ? category._id
                    : category.type === 2
                    ? category.parent_id._id
                    : ''
                }
                tabPosition={'top'}
                onChange={(value) => onChangeFilter('category_id', value)}
                // style={{ height: 220 }}
              >
                {categories
                  .filter((item) => item.type === 1)
                  .map((i) => (
                    <TabPane tab={i.name} key={i._id} />
                  ))}
              </Tabs>
            </Col>
            <Col span={24}>
              {category.type > 0 && (
                <Tabs
                  className="custom-tabs"
                  activeKey={category._id}
                  tabPosition={'top'}
                  onChange={(value) => onChangeFilter('category_id', value)}
                  // style={{ height: 220 }}
                >
                  {categories
                    .filter(
                      (item) =>
                        item.type === 2 &&
                        (item.parent_id._id === category._id ||
                          (category.parent_id && category.parent_id._id === item.parent_id._id))
                    )
                    .map((i) => (
                      <TabPane tab={i.name} key={i._id} />
                    ))}
                </Tabs>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col md={{ span: 6 }}>
          <Card>
            <div className="filter-div">
              <Button value="Đặt lại" type="primary" onClick={clearFilter}>
                Đặt lại
              </Button>
            </div>
            <div className="filter-div">Sắp xếp theo:</div>
            <Select
              value={sort}
              options={sortOptions}
              onChange={(value) => onChangeFilter('sort', value)}
              style={{ width: 200 }}
            />

            <div className="filter-div">Giá:</div>
            <div>
              Giá từ: <span className="filter-div">{price && price[0]}</span>{' '}
              đến <span className="filter-div">{price && price[1]}</span>
            </div>
            <Slider
              range
              step={100000}
              min={100000}
              max={3000000}
              defaultValue={[100000, 3000000]}
              onAfterChange={(value) => onChangeFilter('price', value)}
              // onAfterChange={onAfterChange}
            />

            <div className="filter-div">Size:</div>
            <Radio.Group
              value={size}
              onChange={(e) => onChangeFilter('size', e.target.value)}
            >
              {sizes &&
                sizes.length &&
                sizes.map((item) => (
                  <Radio.Button
                    key={item}
                    value={item}
                    style={{ margin: '5px', width: '50px' }}
                  >
                    {item}
                  </Radio.Button>
                ))}
            </Radio.Group>

            <div className="filter-div">Màu sắc:</div>
            <div className="color-radio">
              {colors &&
                Object.entries(colors).map((item) => (
                  <Tooltip title={item[1]}>
                    <span
                      className={`color-circle ${
                        item[0] === color ? 'color-circle-focus' : ''
                      }`}
                      style={{
                        margin: '5px',
                        backgroundColor: item[0],
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                      onClick={() => onChangeFilter('color', item[0])}
                      key={item[0]}
                    ></span>
                  </Tooltip>
                ))}
            </div>
          </Card>
        </Col>
        <Col md={{ span: 18 }}>
          {loading ? (
            <div className="container">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ul className="container">
              <div className="row">
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id}>
                      <div className="col-md-4" style={{ margin: '10px 0' }}>
                        <li>
                          <div className="productmain">
                            <div className="product">
                              <div className="product-img">
                                <img src={product.thumbnail} alt="giay"></img>
                              </div>
                              <div className="product-text">
                                <h3> {product.name} </h3>
                                <h5> {utils.vndFormat(product.price)} </h5>
                                {/* <div>{product.price}</div> */}
                                <Link to={'/product/' + product._id}>
                                  {' '}
                                  <button className='btn btn-3'> Mua ngay </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    </Link>
                  ))}
                {products && !products.length && (
                  <Empty
                    description="Không có sản phẩm"
                    style={{ width: '-webkit-fill-available' }}
                  />
                )}
                {products && products.length ? (
                  <div className="container" style={{ textAlign: 'right' }}>
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
                ) : null}
              </div>
            </ul>
          )}
        </Col>
      </Row>
    </HomePage>
  );
}

export default ProductScreen;
