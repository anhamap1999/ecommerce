import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, likeProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import HomePage from '../pages/homepage';
import Img from './giay.png';
import CommentEle from './comment/commentEle';
import { InputNumber, Radio, Tooltip, Breadcrumb, notification } from 'antd';
import { saveProductCart } from '../actions/cartActions';
import { getStocks } from '../actions/stockAction';
import { AiOutlineLike, AiOutlineunlike } from 'react-icons/ai';
import { getFullInfoUser } from '../actions/userActions';

import _ from 'lodash';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import utils from '../modules/utils';

function DetailsScreen(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(0);
  const productDetails = useSelector((state) => state.productDetails);
  const { stocks, loading: loadingStock } = useSelector((state) => state.stock);
  const { categories } = useSelector((state) => state.listCategories);
  const [likeState, setLikeState] = useState('');
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const { loadingUser } = useSelector((state) => state.getFullInfo);

  const stockIndex = stocks && stocks.findIndex((item) => item.size === size);
  const stock = stocks && stocks[stockIndex] ? stocks[stockIndex].stock : 0;

  const { product = {}, loading, error, updateLoading } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    dispatch(getStocks({ product_id: props.match.params.id }));
    const { user } = JSON.parse(localStorage.getItem('userInfo'));

    const state =
      user &&
      user.like_products &&
      user.like_products.findIndex(
        (item) => String(item._id) === String(_id)
      ) >= 0
        ? 'like'
        : 'unlike';
    setLikeState(state);
    return () => {};
  }, []);

  const {
    _id,
    price,
    name,
    rating,
    likes_count,
    sold_count,
    images,
    category_id,
    comments_count,
    out_of_stock,
    description,
    size: sizes,
    SKU,
  } = product;
  // const likeState =
  //   userInfo &&
  //   userInfo.user &&
  //   userInfo.user.like_products &&
  //   userInfo.user.like_products.findIndex((item) => item._id === _id) >= 0
  //     ? 'like'
  //     : 'unlike';
  const category_parent =
    category_id && category_id.type === 2
      ? categories.find((item) => item._id === category_id.parent_id)
      : null;

  const sizeOnchange = (e) => {
    setSize(e.target.value);
  };

  const addProductTocart = async () => {
    if (!size) {
      notification.warning({
        message: 'Vui lòng chọn size',
      });
    } else {
      await dispatch(
        saveProductCart({
          quantity: qty,
          size,
          product_id: _id,
          price: price,
        })
      );
    }
  };

  const onLikeProduct = async () => {
    await dispatch(
      likeProduct(_id, likeState === 'unlike' ? 'like' : 'unlike')
    );
    // likeState = likeState === 'unlike' ? 'like' : 'unlike';
    await dispatch(getFullInfoUser());
    const { user } = JSON.parse(localStorage.getItem('userInfo'));
    const state =
      user &&
      user.like_products &&
      user.like_products.findIndex(
        (item) => String(item._id) === String(_id)
      ) >= 0
        ? 'like'
        : 'unlike';
    setLikeState(state);
  };
  return (
    <HomePage>
      {console.log('likeState', likeState)}
      {loading || loadingStock ? (
        <div className='container'>
          <div className='spinner-border text-primary' role='status'>
            <span className='sr-only'></span>
          </div>
        </div>
      ) : error ? (
        <div> {error} </div>
      ) : (
        product &&
        !_.isEmpty(product) && (
          <div className=' details' style={{ marginTop: '100px' }}>
            <div className='details-product container'>
              <div className='row'>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to='/'>Trang chủ</Link>
                  </Breadcrumb.Item>
                  {category_parent && (
                    <Link to={'/products/' + category_parent.pure_name}>
                      {category_parent.pure_name}
                    </Link>
                  )}
                  <Breadcrumb.Item>
                    <Link to={'/products/' + category_id.pure_name}>
                      {category_id.name}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  {/* <div className='details-img'>
                    <img src={Img}></img>
                  </div> */}
                  <ImageGallery
                    // {...properties}
                    items={images.map((item) => ({
                      alt: 'product-image',
                      original: item,
                      thumbnail: item,
                    }))}
                    showFullscreenButton={true}
                    showPlayButton={false}
                    showNav={true}
                  />
                </div>
                <div className='col-md-6'>
                  <div className='details-text'>
                    <h3
                      className='text-secondary'
                      style={{ textTransform: 'uppercase' }}
                    >
                      {name}
                    </h3>
                    <div className='review-actions'>
                      {/* <p className='action-inline'>
                        <span className='count'>{views_count}</span>{' '}
                        Lượt xem
                      </p> */}
                      <p className='action-inline'>
                        <span className='count'>{likes_count}</span> Lượt thích
                      </p>
                      <p className='action-inline'>
                        <span className='count'>{rating}</span> Đánh giá
                      </p>
                      <p className='action-inline'>
                        <span className='count'>{comments_count}</span> Bình
                        luận
                      </p>
                      <p className='action-inline'>
                        <span className='count'>{sold_count}</span> Đã bán
                      </p>
                    </div>
                    {/* <p className='text-secondary'>
                      {numReviews} Reviews
                    </p> */}
                    <h4>
                      GIÁ:{' '}
                      <span className='text-warning'>
                        {utils.vndFormat(price)}
                      </span>
                    </h4>
                    <div style={{ marginTop: '10px' }}>
                      <span style={{ fontSize: '16pt' }}>SKU: {SKU}</span>
                    </div>
                    {out_of_stock ? (
                      <h1>HẾT HÀNG</h1>
                    ) : (
                      <>
                        <div style={{ marginTop: '10px' }}>
                          <span style={{ fontSize: '16pt' }}>Số lượng: </span>
                          <InputNumber
                            min={1}
                            // max={stock}
                            value={qty}
                            onChange={(value) => setQty(value)}
                          />
                          {console.log(qty)}
                        </div>
                        <div style={{ marginBottom: '5px', marginTop: '10px' }}>
                          <span style={{ fontSize: '16pt' }}>Size: </span>
                          <Radio.Group value={size} onChange={sizeOnchange}>
                            {sizes &&
                              sizes.map((item) => (
                                <Radio.Button
                                  value={item}
                                  // className={`product-detail-size ${
                                  //   item === size ? 'product-detail-size-focus' : ''
                                  // }`}
                                  disabled={
                                    stocks.findIndex(
                                      (s) => s.size === item && s.stock === 0
                                    ) >= 0
                                  }
                                >
                                  {item}
                                </Radio.Button>
                              ))}
                          </Radio.Group>
                          {size ? (
                            <div
                              style={{ color: 'GrayText', marginTop: '10px' }}
                            >
                              Có {stock} sản phẩm trong kho
                            </div>
                          ) : null}
                          {/* {size.map((item, index) => (
                            <button
                              type='button'
                              key={index}
                              style={{
                                padding: '8px',
                                width: '80px',
                                margin: '5px',
                              }}
                              className='product-details-size'
                              // className={
                              //   item == 37
                              //     ? 'btn btn-outline-danger'
                              //     : 'btn btn-outline-secondary'
                              // }
                              value={item}
                              onClick={sizeOnchange}
                            >
                              {item}
                              {console.log('bds', size)}
                            </button>
                          ))} */}
                        </div>
                      </>
                    )}

                    {/* <Link to={`/cart/${_id}?qty=${qty}&&size=${size}`}> */}
                    {size ? (
                      <Link to={`/cart`}>
                        <button
                          type='button'
                          style={{ padding: '15px' }}
                          className='btn btn-danger'
                          onClick={addProductTocart}
                        >
                          <span>
                            <i className='bx bxs-cart'></i>
                          </span>{' '}
                          THÊM VÀO GIỎ HÀNG
                        </button>
                      </Link>
                    ) : (
                      <button
                        type='button'
                        style={{ padding: '15px' }}
                        className='btn btn-danger'
                        onClick={addProductTocart}
                      >
                        <span>
                          <i className='bx bxs-cart'></i>
                        </span>{' '}
                        THÊM VÀO GIỎ HÀNG
                      </button>
                    )}
                    {/* comment */}
                    <Tooltip
                      title={likeState === 'unlike' ? 'Thích' : 'Bỏ thích'}
                    >
                      <button
                        type='button'
                        style={{ padding: '13px', margin: '20px' }}
                        className={`btn ${
                          likeState === 'unlike'
                            ? 'btn-primary'
                            : 'btn-secondary'
                        }`}
                        onClick={onLikeProduct}
                      >
                        {updateLoading || loadingUser ? (
                          <div
                            className='spinner-border text-primary'
                            role='status'
                          >
                            <span className='sr-only'></span>
                          </div>
                        ) : (
                          <AiOutlineLike
                            style={{ fontSize: '25px', color: '#fff' }}
                          />
                        )}
                        {/* <i
                        className='bx bxs-heart'
                        style={{ fontSize: '20px', color: '#fff', margin: 'auto' }}
                      ></i> */}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className='detail-product-des container'>
                <h4> Thông tin chi tiết sản phẩm</h4>
                <p>{description}</p>
              </div>
            </div>
            <div className='container' style={{ marginTop: '20px' }}>
              <h3 className='text-primary'>
                <i
                  className='bx bx-comment-detail'
                  style={{ marginRight: '5px' }}
                ></i>{' '}
                Bình luận{' '}
              </h3>
            </div>
          </div>
        )
      )}

      <div className='details-product container'>
        {product && <CommentEle productID={_id} />}
      </div>
    </HomePage>
  );
}

export default DetailsScreen;
