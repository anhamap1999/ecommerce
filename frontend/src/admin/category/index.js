import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteCategoryAdmin,
  getCatogoryAll,
  saveCategoryNew,
} from '../../actions/categoryAction';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import { Modal, Button } from 'antd';
import { useState } from 'react';
const CategoryAdminScreen = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [parent_id, setParent_id] = useState('');
  const [image, setImage] = useState('');

  const saveCategory = useSelector((state) => state.saveCategory);
  const { success: ok } = saveCategory;
  const listCategories = useSelector((state) => state.listCategories);
  const { categories, loadingCat, errorCat } = listCategories;
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openModal = (category) => {
    setIsModalVisible(true);
    setName(category.name);
    setId(category._id);
    setType(category.type);
    setImage(category.image);
    setParent_id(category.parent_id);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (type == 1) {
      dispatch(saveCategoryNew({ name, type, image }));
    } else {
      dispatch(saveCategoryNew({ name, type, parent_id, image }));
    }
  };
  const deleteHandler = async (category) => {
    await dispatch(deleteCategoryAdmin(category._id));
    dispatch(getCatogoryAll());
  };
  useEffect(() => {
    if (ok) {
      setIsModalVisible(false);
    }
    dispatch(getCatogoryAll());
    return () => {};
  }, [ok]);
  return (
    <DashboardScreen>
      <div className="maine">
        <h3>Danh mục</h3>
        <button className="btn btn-danger ab-right" onClick={showModal}>
          Thêm Danh mục
        </button>
        <Modal
          title={id ? 'Cập nhật Danh mục' : 'Thêm Danh mục'}
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <form className="rounded border" onSubmit={submitHandler}>
            <ul className="form-container">
              <li className="form-group">
                <label htmlFor="name">Tên danh mục</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li className="form-group">
                <label htmlFor="name">Cấp</label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  value={type}
                  min="1"
                  max="3"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </li>

              {type == 2 && (
                <li className="form-group">
                  <label htmlFor="name">Thuộc Danh mục</label>

                  <select
                    className="form-control"
                    name="name"
                    value={parent_id}
                    id="parent_id"
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
                <label htmlFor="image">Ảnh</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></textarea>
              </li>

              <li>
                <button className="btn btn-primary" type="submit">
                  Thêm
                </button>
              </li>
            </ul>
          </form>
        </Modal>
      </div>
      {loadingCat ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      ) : errorCat ? (
        <div className="">{errorCat}</div>
      ) : (
        <div>
          <div className="list-product-add  ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên Danh mục</th>
                  <th scope="col">Loại danh mục </th>
                  <th scope="col">Danh mục cha</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Tùy chỉnh</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.type}</td>
                      <td>{category.name}</td>
                      {/* {   categories.findIndex(item => item._id == category.parent_id &&   
                                                        <td>{item.name} </td>)
                                                } */}
                      <td>{category.status}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => openModal(category)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-dark"
                          onClick={() => deleteHandler(category)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardScreen>
  );
};

export default CategoryAdminScreen;
