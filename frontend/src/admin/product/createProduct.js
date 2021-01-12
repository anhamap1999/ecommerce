import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  changeAdminProductFields,
} from '../../actions/productActions';
import { Checkbox, Tooltip, Modal, Spin } from 'antd';
import UploadImage from '../../components/UploadImage';

const CreateProduct = (props) => {
  const {
    loading: loadingAdd,
    success: successful,
    error: errorAdd,
    product = {},
    modalVisible,
  } = useSelector((state) => state.productState);

  const listCategories = useSelector((state) => state.listCategories);
  const { categories } = listCategories;

  const { configs } = useSelector((state) => state.config);
  const sizeIndex = configs && configs.findIndex((item) => item.key === 'size');
  const sizes = configs[sizeIndex] ? configs[sizeIndex].value : [];

  const colorIndex =
    configs && configs.findIndex((item) => item.key === 'color');
  const colors = configs[colorIndex] ? configs[colorIndex].value : [];
  const brandIndex =
    configs && configs.findIndex((item) => item.key === 'brand');
  const brands = configs[brandIndex] ? configs[brandIndex].value : [];
  const {
    id = null,
    name = '',
    images = [],
    brand = '',
    price = 0,
    description = '',
    SKU = '',
    thumbnail = '',
    color = '',
    category_id = '',
    size = [],
  } = product;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  useEffect(() => {
    if (successful) {
      //   setModalVisible(false);
      onCancel();
      onReset();
    }
    return () => {};
  }, [successful]);

  const onChange = (key, value) => {
    dispatch(changeAdminProductFields({ ['product.' + key]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // const array = [];
    // for (let i = 0; i < image.length; i++) {
    //   const result = await uploadFile(image[i]);
    //   array.push(result);
    // }
    await dispatch(
      addProduct({
        ...product,
        images: images.map((i) => i.url),
        thumbnail:
          thumbnail && thumbnail.length && thumbnail[0] ? thumbnail[0].url : '',
      })
    );
    onCancel();
  };

  const onReset = () => {
    dispatch(changeAdminProductFields({ product: {} }));
  };
  const onCancel = () => {
    dispatch(changeAdminProductFields({ modalVisible: false }));
  };
  return (
    <Modal
      visible={modalVisible}
      onCancel={onCancel}
      width={'80%'}
      footer={null}
      title={id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
    >
      <Spin spinning={loadingAdd}>
        <form className='form-create-product' onSubmit={submitHandler}>
          <div className='form-container'>
            <div className='form-group'>
              <label htmlFor='name'>Tên sản phẩm</label>
              <input
                className='form-control'
                type='text'
                name='name'
                value={name}
                id='name'
                onChange={(e) => onChange('name', e.target.value)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='images'>Ảnh</label>
              <UploadImage
                imageUrls={images}
                maxLength={20}
                imageWidth={1200}
                onChange={(images) => onChange('images', images)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='brand'>Ảnh kèm</label>
              <UploadImage
                imageUrls={thumbnail}
                maxLength={1}
                imageWidth={200}
                onChange={(images) => onChange('thumbnail', images)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Danh mục</label>

              <select
                className='custom-select'
                id='inputGroupSelect01'
                onChange={(e) => onChange('category_id', e.target.value)}
                value={category_id}
              >
                <option selected>Chọn danh mục</option>
                {categories.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>SKU</label>
              <input
                className='form-control'
                type='text'
                name='SKU'
                id='SKU'
                value={SKU}
                onChange={(e) => onChange('SKU', e.target.value)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Thương hiệu</label>
              <select
                className='custom-select'
                id='inputGroupSelect01'
                onChange={(e) => onChange('brand', e.target.value)}
                value={brand}
              >
                <option selected>Chọn thương hiệu</option>
                {brands.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='brand'>Size</label>
              <div>
                <Checkbox.Group
                  options={sizes.map((i) => ({ label: i, value: i }))}
                  onChange={(value) => onChange('size', value)}
                  value={size}
                />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Giá</label>
              <input
                className='form-control'
                type='text'
                name='price'
                id='price'
                value={price}
                onChange={(e) => onChange('price', e.target.value)}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='stock'>Màu Sắc</label>
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
                      onClick={() => onChange('color', item[0])}
                      key={item[0]}
                    ></span>
                  </Tooltip>
                ))}
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Mô tả</label>
              <textarea
                className='form-control'
                type='text'
                name='description'
                value={description}
                id='description'
                onChange={(e) => onChange('description', e.target.value)}
              ></textarea>
            </div>

            <div className='flex-box'>
              <button className='btn btn-danger' type='submit'>
                {id ? 'Cập nhật' : 'Thêm sản phẩm'}
              </button>
            </div>
          </div>
        </form>
      </Spin>
    </Modal>
  );
};

export default CreateProduct;
