import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateStatusCategory,
  getCatogoryAll,
  saveCategoryNew,
  getCatogoryAdmin
} from '../../actions/categoryAction';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import { Modal, Button, Spin, Tooltip } from 'antd';
import { useState } from 'react';
import UploadImage from '../../components/UploadImage';

import { AiFillEdit } from 'react-icons/ai'
const CategoryAdminScreen = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [parent_id, setParent_id] = useState('');
  const [image, setImage] = useState('');
  const [imageRef, setImageRef] = useState(null);
  const saveCategory = useSelector((state) => state.saveCategory);
  const { success: ok, loadingCat = false } = saveCategory;
  const listCategories = useSelector((state) => state.categoryAdmin);
  const { categories, loading = false, errorCat } = listCategories;
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(getCatogoryAdmin({ sort: '-created_at'}));
  }, [])

  const handleCancel = () => {
    setIsModalVisible(false);
    setName('');
    setId(null);
    setType('');
    setImage('');
    setParent_id(null);
  };
  const openModal = (category) => {
    setIsModalVisible(true);
    setName(category.name);
    setId(category._id);
    setType(category.type);
    setImage(category.image);
    setParent_id(category.parent_id ? category.parent_id._id : '');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let savedImage = await imageRef.onUpdateImage({ imageUrls: [image] });
    if (type == 1) {
      dispatch(
        saveCategoryNew({
          name,
          type,
          image:
            savedImage && savedImage.length && savedImage[0]
              ? savedImage[0].url
              : '',
        })
      );
    } else {
      dispatch(saveCategoryNew({ name, type, parent_id, image, id }));
    }
  };
  const updateStatusHandler = async (category, status) => {
    await dispatch(updateStatusCategory(category._id, status));
    await dispatch(getCatogoryAdmin({ sort: '-created_at'}));
  };
  useEffect(() => {
    if (ok) {
      setIsModalVisible(false);
    }
    dispatch(getCatogoryAdmin({ sort: '-created_at'}));
    return () => {};
  }, [ok]);
  return (
    <DashboardScreen>
      <div className='maine'>
        <h3>Danh mục</h3>
        <button className='btn btn-danger ab-right' onClick={showModal}>
          Thêm Danh mục
        </button>
        <Modal
          title={id ? 'Cập nhật Danh mục' : 'Thêm Danh mục'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Spin spinning={loadingCat}>
          <form className='' onSubmit={submitHandler}>
            <ul className='form-container'>
              <li className='form-group'>
                <label htmlFor='name'>Tên danh mục</label>
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  value={name}
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li className='form-group'>
                <label htmlFor='name'>Cấp</label>
                <input
                  className='form-control'
                  type='number'
                  name='name'
                  value={type}
                  min='1'
                  max='3'
                  id='type'
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </li>

              {type == 2 && (
                <li className='form-group'>
                  <label htmlFor='name'>Thuộc Danh mục</label>

                  <select
                    className='form-control'
                    name='name'
                    value={parent_id}
                    id='parent_id'
                    onChange={(e) => setParent_id(e.target.value)}
                  >
                    <option>chọn danh mục dưới đây..</option>
                    {categories &&
                      categories.map(
                        (category) =>
                          category.type == '1' && (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          )
                      )}
                  </select>
                </li>
              )}
              <li>
                <label htmlFor='image'>Ảnh</label>
                {/* <textarea
                  className="form-control"
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></textarea> */}
                <UploadImage
                  imageUrls={[image]}
                  maxLength={1}
                  imageWidth={200}
                  onChange={(images) => setImage(images[0])}
                  customRef={(ref) => setImageRef(ref)}
                />
              </li>

              <div className='flex-box'>
                <button className='btn btn-primary' type='submit'>
                  Thêm
                </button>
              </div>
            </ul>
          </form>
          </Spin>
        </Modal>
      </div>
      {(
        <Spin spinning={loading || loadingCat}>
        <div>
          <div className='list-product-add  '>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>STT</th>
                  <th scope='col'>Tên Danh mục</th>
                  <th scope='col'>Loại danh mục </th>
                  <th scope='col'>Danh mục cha</th>
                  <th scope='col'>Trạng thái</th>
                  <th scope='col'>Tùy chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        {category.type === 1 ? 'Danh mục cha' : 'Danh mục con'}
                      </td>
                      <td>
                        {category.type === 2 && category.parent_id
                          ? category.parent_id.name
                          : 'Không có'}
                      </td>
                      {/* {   categories.findIndex(item => item._id == category.parent_id &&   
                                                        <td>{item.name} </td>)
                                                } */}
                      <td>
                        <div
                          className={'label-custom label-' + category.status}
                        >
                          {category.status === 'active'
                            ? 'Đang hoạt động'
                            : 'Đã vô hiệu'}
                        </div>
                      </td>
                      <td>
                        <button
                          className={`btn btn-${
                            category.status === 'active' ? 'danger' : 'success'
                          }`}
                          onClick={() =>
                            updateStatusHandler(
                              category,
                              category.status === 'active'
                                ? 'disabled'
                                : 'active'
                            )
                          }
                        >
                          {category.status === 'active'
                            ? 'Kích hoạt'
                            : 'Vô hiệu'}
                        </button>
                      </td>
                      <td>
                        {/* <button
                          className='btn btn-primary'
                          onClick={() => openModal(category)}
                        >
                          Sửa
                        </button> */}
                         <Tooltip title='Sửa'>
                          <span onClick={() => openModal(category)} style={{ cursor: 'pointer'}}>
                          <AiFillEdit style={{ fontSize: '20px' }} />
                          </span>
                        </Tooltip>  
                        {/* <button
                          className='btn btn-dark'
                          onClick={() => deleteHandler(category)}
                        >
                          Xóa
                        </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        </Spin>
      )}
    </DashboardScreen>
  );
};

export default CategoryAdminScreen;
