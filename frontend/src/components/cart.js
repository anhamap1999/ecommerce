import { InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from './giay.png';
import { Link } from 'react-router-dom';
import {
  deleteProductCart,
  getProductCart,
  updateProductCart,
  changeFields,
} from '../actions/cartActions';
import HomePage from '../pages/homepage';
function CartScreen(props) {
  const [qti, setQti] = useState();
  const dispatch = useDispatch();
  const deleteHandler = async (cartId) => {
    await dispatch(deleteProductCart(cartId));
    // dispatch(getProductCart());
  };
  const redirectShipping = () => {
    props.history.push('/signin?redirect=shipping');
  };
  const cartUser = useSelector((state) => state.cartUser);
  const { cartItems, loading, error, updatingId, loadingUpdate } = cartUser;
  useEffect(() => {
    dispatch(getProductCart());
  }, []);
  console.log('cartItems', cartItems);
  const updataItemHandler = async (cartId, qti, size) => {
    await dispatch(updateProductCart(cartId, qti, parseInt(size)));
    // dispatch(getProductCart());
  };
  const onChange = (index, key, value) => {
    dispatch(changeFields({ [`cartItems[${index}].${key}`]: value }));
  };
  return (
    <HomePage>
      <div className="container cart-details">
        <div className="text-center">
          <h1>Giỏ hàng của bạn</h1>
        </div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : error ? (
          <div className="">{error}</div>
        ) : (
          <div className="">
            <div className="row">
              <div className="col-md-8 col-12">
                {cartItems &&
                  cartItems.map((item, index) =>
                    loadingUpdate && updatingId === item._id ? (
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      <div className="row yourcart" key={index}>
                        <div className="col-md-3">
                          {item.product_id&&item.product_id.images && (
                            <img src={item.product_id.images[0]}></img>
                          )}
                        </div>
                        <div className="col-md-2">
                          <Link to={'/product/' + item.product_id._id}>
                            <h6 className="font-weight-bold">
                              {item.product_id.name}
                            </h6>
                          </Link>
                        </div>
                        <div className="col-md-2">
                          <InputNumber
                            min={1}
                            max={item.product_id.stock}
                            defaultValue={item.quantity}
                            onChange={(v) => onChange(index, 'quantity', v)}
                          />
                        </div>
                        <div className="col-md-3">
                          <div>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <label
                                  className="input-group-text"
                                  for="inputGroupSelect01"
                                >
                                  Size
                                </label>
                              </div>
                              <select
                                className="custom-select"
                                id="inputGroupSelect01"
                                onChange={(e) =>
                                  onChange(index, 'size', e.target.value)
                                }
                              >
                                <option selected>{item.size}</option>
                                {item.product_id.size.map((x) => (
                                  <option key={x} value={x}>{x}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div style={{ marginBottom: '5px' }}>
                            <span
                              style={{ fontSize: '18px', color: '#ee4d2d' }}
                            >
                              {item.product_id.price}VNĐ
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1">
                          <button
                            className="btn btn-outline-secondary"
                            style={{ width: '100px', marginBottom: '10px  ' }}
                            onClick={() => deleteHandler(item._id)}
                          >
                            Xóa
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            style={{ width: '100px' }}
                            onClick={(e) =>
                              updataItemHandler(
                                item._id,
                                item.quantity,
                                item.size
                              )
                            }
                          >
                            Cập nhật
                          </button>
                        </div>
                      </div>
                    )
                  )}
              </div>
              <div className="col-md-4 col-12">
                {cartItems && (
                  <div className="total-cart">
                    <h3 className="text-center text-secondary ">
                      CHI TIẾT GIỎ HÀNG
                    </h3>
                    <p>
                      Tổng Thành tiền:{' '}
                      <span style={{ fontSize: '20px', color: '#ee4d2d' }}>
                        {cartItems.reduce(
                          (a, c) => a + c.product_id.price * c.quantity,
                          0
                        )}
                      </span>{' '}
                      VNĐ
                    </p>
                    <p>Số lượng: {cartItems.length}</p>
                    <button
                      style={{ borderRadius: '5px', width: '100%' }}
                      onClick={redirectShipping}
                      className="btn btn-danger"
                    >
                      <span>MUA HÀNG</span>
                    </button>
                  </div>
                )}
              </div>
              {/* ))
                )} */}
              {/* </div> */}
            </div>
          </div>
          // </div>
        )}
      </div>
    </HomePage>
  );
}

export default CartScreen;
