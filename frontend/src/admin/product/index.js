import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addProduct,
  listProducts,
  removeProductID,
} from '../../actions/productActions';
import DashboardScreen from '../dashboard';
import { Pagination } from 'antd';
const ProductAdminScreen = (props) => {
  const [openmodalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [SKU, setSKU] = useState('');
  const [attributes, setAttributes] = useState({});
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const createProduct = useSelector((state) => state.createProduct);
  const {
    loading: loadingadd,
    success: successful,
    error: erroradd,
  } = createProduct;
  const dispatch = useDispatch();

  const { page, total } = {};
  const onPaginationChange = (page, limit) => {
    dispatch(listProducts({ page, limit }));
  };
  useEffect(() => {
    dispatch(listProducts({ page: 1, limit: 30 }));
    return () => {};
  }, []);
  const removeProduct = useSelector((state) => state.removeProduct);
  const {
    loading: loadingdelete,
    success: successdelete,
    error: errordelete,
  } = removeProduct;
  useEffect(() => {
    if (successful) {
      setModalVisible(false);
    }
    return () => {};
  }, [successful, successdelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setImages(product.images);
    setBrand(product.brand);
    setPrice(product.price);
    setDescription(product.description);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        _id: id,
        name,
        images,
        brand,
        price,
        thumbnail,
        color,
        attributes,
        SKU,
        category_id,
        description,
      })
    );
  };
  const deleteproduct = (product) => {
    dispatch(removeProductID(product._id));
  };

  return (
    <DashboardScreen>
      <div className='maine'>
        <h3>Sản Phẩm</h3>
        <button
          className='btn btn-danger ab-right'
          onClick={() => openModal({})}
        >
          Thêm Sản Phẩm
        </button>
      </div>

      <div className='row'>
        {openmodalVisible && (
          <div className='create-form col-md-5'>
            <form className='rounded border' onSubmit={submitHandler}>
              <h1>{id ? 'Cập nhật' : 'Thêm'}</h1>
              <span onClick={() => setModalVisible(false)}> Đóng </span>
              <ul className='form-container'>
                <li>
                  {loadingadd && <div>Loading...</div>}
                  {erroradd && <div>{error}</div>}
                </li>
                <li className='form-group'>
                  <label htmlFor='name'>Tên sản phẩm</label>
                  <input
                    className='form-control'
                    type='text'
                    name='name'
                    value={name}
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='images'>Ảnh</label>
                  <input
                    className='form-control'
                    type='file'
                    name='images'
                    value={images}
                    id='images'
                    onChange={(e) => setImages(e.target.files[0])}
                  >
                    {console.log('anh', images)}
                  </input>
                </li>

                <li>
                  <label htmlFor='brand'>Ảnh kèm</label>
                  <input
                    className='form-control'
                    type='text'
                    name='thumbnail'
                    id='thumbnail'
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='brand'>Danh mục</label>
                  <input
                    className='form-control'
                    type='text'
                    name='category_id'
                    id='category_id'
                    value={category_id}
                    onChange={(e) => setCategory_id(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='brand'>SKU</label>
                  <input
                    className='form-control'
                    type='text'
                    name='SKU'
                    id='SKU'
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='brand'>Thương hiệu</label>
                  <input
                    className='form-control'
                    type='text'
                    name='brand'
                    id='brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='brand'>Đặc tính</label>
                  <input
                    className='form-control'
                    type='text'
                    name='attributes'
                    id='attributes'
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='price'>Giá</label>
                  <input
                    className='form-control'
                    type='text'
                    name='price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='stock'>Màu Sắc</label>
                  <input
                    className='form-control'
                    type='text'
                    name='stock'
                    id='stock'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor='description'>chi tiết</label>
                  <textarea
                    className='form-control'
                    type='text'
                    name='description'
                    value={description}
                    id='description'
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </li>

                <li>
                  <button className='btn btn-danger' type='submit'>
                    {id ? 'Cập nhật' : 'Thêm sản phẩm'}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        )}
        <div
          className='list-product-add  '
          className={!openmodalVisible ? 'col-md-12' : 'col-md-7'}
        >
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Tên sản phẩm</th>
                <th scope='col'>Thương hiệu</th>
                <th scope='col'>Thể loại</th>
                <th scope='col'>Giá</th>
                <th scope='col'>Trạng thái</th>
                <th scope='col'>Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              ) : error ? (
                <div className=''>loading</div>
              ) : (
                products &&
                products.data &&
                products.data.map((product) => (
                  <>
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.category_id}</td>
                      <td>{product.price}</td>
                      <td>{product.status}</td>
                      <td>
                        <button
                          className='btn btn-success'
                          onClick={() => openModal(product)}
                        >
                          Sửa
                        </button>
                        <button
                          className='btn btn-dark'
                          onClick={() => deleteproduct(product)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  </>
                ))
              )}
              {products && products.data && (
                <Pagination
                  current={page}
                  total={products.total}
                  pageSize={2}
                  pageSizeOptions={[10, 20, 30]}
                  onChange={onPaginationChange}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardScreen>
  );
};

export default ProductAdminScreen;
