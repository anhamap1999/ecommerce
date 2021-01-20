import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Tooltip, Modal, Spin } from 'antd';
import {
  changeFields,
  getStocks,
  importStock,
} from '../../actions/stockAction';
import moment from 'moment'

const ImportStock = (props) => {
  const {
    stocks,
    loading,
    error,
    updating = {},
    query = {},
  } = useSelector((state) => state.stock);
  const { success, modalVisible = false, updatingLoading = false, updatingIndex } = updating;
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const { product_id = {}, size, _id } =
    stocks && stocks.length && stocks[updatingIndex]
      ? stocks[updatingIndex]
      : {};

    // useEffect(() => {
        
    // }, []);

  //   useEffect(() => {
  //     if (successful) {
  //       //   setModalVisible(false);
  //       onCancel();
  //       onReset();
  //     }
  //     return () => {};
  //   }, [successful]);

  //   const onChange = (key, value) => {
  //     console.log(key, value);
  //     dispatch(changeFields({ ['product.' + key]: value }));
  //   };
  const submitHandler = async (e) => {
    e.preventDefault();
    // const array = [];
    // for (let i = 0; i < image.length; i++) {
    //   const result = await uploadFile(image[i]);
    //   array.push(result);
    // }
    await dispatch(
      importStock({
        id: _id,
        price: parseInt(price),
        stock: parseInt(stock),
      })
    );
    if (success) {
        onCancel();
        setPrice('');
        setStock('');
        dispatch(changeFields({ 'updating.updatingIndex': -1 }));
        await dispatch(getStocks(query));
    }
  };

  const onCancel = () => {
    dispatch(changeFields({ 'updating.modalVisible': false }));
  };
  console.log(moment().startOf('date').toISOString());
  return (
    <Modal
      visible={modalVisible}
      onCancel={onCancel}
      width={'50%'}
      footer={null}
      title={'Nhập kho'}
    >
      <Spin spinning={updatingLoading}>
        <form className='form-create-product' onSubmit={submitHandler}>
          <div className='form-container'>
            <div className='form-group'>
              <label htmlFor='name'>Tên sản phẩm</label>
              <input
                className='form-control'
                type='text'
                name='name'
                value={product_id ? product_id.name : ''}
                id='name'
                disabled={true}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Size</label>
              <input
                className='form-control'
                type='text'
                name='SKU'
                id='SKU'
                value={size}
                disabled={true}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Giá nhập kho</label>
              <input
                className='form-control'
                type='text'
                name='price'
                id='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Số lượng nhập</label>
              <input
                className='form-control'
                type='text'
                name='stock'
                id='stock'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              ></input>
            </div>

            <div className='flex-box'>
              <button className='btn btn-danger' type='submit'>
                {'Lưu'}
              </button>
            </div>
          </div>
        </form>
      </Spin>
    </Modal>
  );
};

export default ImportStock;
