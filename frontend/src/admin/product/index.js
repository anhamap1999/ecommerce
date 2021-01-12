import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCatogoryAll } from '../../actions/categoryAction';
import {
  addProduct,
  listProducts,
  listProductsAdmin,
  removeProductID,
  updateStateProduct,
} from '../../actions/productActions';

import vndFormat from '../../modules/utils';
import { uploadFile } from '../../modules/file';
import DashboardScreen from '../dashboard';
import { Checkbox, Pagination, Space, Table } from 'antd';
import { getConfig } from '../../actions/configAction';
import Column from 'antd/lib/table/Column';
const ProductAdminScreen = (props) => {
  const [openmodalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState([]);

  const [thumbnail, setThumbnail] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [SKU, setSKU] = useState('');
  const [attributes, setAttributes] = useState([1, 2, 3]);

  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { products, loading, totalPage, total, error } = productListAdmin;
  const createProduct = useSelector((state) => state.createProduct);

  const listCategories = useSelector((state) => state.listCategories);
  const { categories, loadingCat, errorCat } = listCategories;

  const config = useSelector((state) => state.config);
  const { configs } = config;

  const sizeIndex = configs && configs.findIndex((item) => item.key === 'size');

  const sizes = configs[sizeIndex] ? configs[sizeIndex].value : [];

  const onChangeSize = (e) => {
    e.preventDefault();
  };
  const {
    loading: loadingadd,
    success: successful,
    error: erroradd,
  } = createProduct;
  const dispatch = useDispatch();

  const onPaginationChange = () => {
    dispatch(listProductsAdmin({ page: 1, limit: 30 }));
  };
  useEffect(() => {
    dispatch(listProductsAdmin({ page: 1, limit: 30 }));
    dispatch(getCatogoryAll());
    dispatch(getConfig());
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

    setBrand(product.brand);
    setPrice(product.price);
    setDescription(product.description);
  };
  const sizeAr = [];
  const onSelectSize = (e) => {
    sizeAr.push(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const array = [];
    for (let i = 0; i < image.length; i++) {
      const result = await uploadFile(image[i]);
      array.push(result);
    }
    dispatch(
      addProduct({
        _id: id,
        name,
        images: array,
        brand,
        price,
        thumbnail,
        color,
        attributes,
        SKU,
        category_id,
        description,
        size: sizeAr,
      })
    );
  };
  const deleteproduct = (product) => {
    dispatch(removeProductID(product._id));
  };
  const onchangeimage = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  const columnList = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'key',
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_id',
      key: 'key',
      render: (text, record, index) => text.name,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'key',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'key',
    },
    {
      title: 'Màu',
      dataIndex: 'color',
      key: 'key',
    },
    {
      title: 'Tùy chỉnh',
      key: 'key',
      render: (key) => (
        <>
          <Space size="middle">
            <select
              className="custom-select"
              id="inputGroupSelect01"
              onChange={(e) => setUpdateState(e.target.value)}
            >
              <option value={key.status} selected>
                {key.status}
              </option>
              <option value="pending">đang đợi</option>
              <option value="approved">Cho bán</option>
              <option value="rejected">Từ chối</option>
              <option value="disabled">ngừng bán</option>
            </select>
          </Space>
        </>
      ),
    },
    ,
    {
      title: '',
      key: 'key',
      render: (key) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => changeState(key._id)}
          >
            Cập nhật
          </button>
        </Space>
      ),
    },
  ];

  const [updateState, setUpdateState] = useState('');
  const changeState = (productId) => {
    dispatch(updateStateProduct(productId, { status: updateState }));
  };
  return (
    <DashboardScreen>
      <div className="maine">
        <h3>Sản Phẩm</h3>
        <button
          className="btn btn-danger ab-right"
          onClick={() => openModal({})}
        >
          Thêm Sản Phẩm
        </button>
      </div>

      <div className="row">
        {openmodalVisible && (
          <div className="create-form col-md-5">
            <form className="rounded border" onSubmit={submitHandler}>
              <h1>{id ? 'Cập nhật' : 'Thêm'}</h1>
              <span onClick={() => setModalVisible(false)}> Đóng </span>
              <ul className="form-container">
                <li>
                  {loadingadd && <div>Loading...</div>}
                  {erroradd && <div>{error}</div>}
                </li>
                <li className="form-group">
                  <label htmlFor="name">Tên sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="images">Ảnh</label>
                  <input
                    multiple
                    className="form-control"
                    type="file"
                    onChange={onchangeimage}
                  ></input>
                </li>

                <li>
                  <label htmlFor="brand">Ảnh kèm</label>
                  <input
                    className="form-control"
                    type="text"
                    name="thumbnail"
                    id="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="brand">Danh mục</label>

                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option selected>chọn danh mục</option>
                    {categories.map((x) => (
                      <option key={x._id} value={x._id}>{x.name}</option>
                    ))}
                  </select>
                </li>
                <li>
                  <label htmlFor="brand">SKU</label>
                  <input
                    className="form-control"
                    type="text"
                    name="SKU"
                    id="SKU"
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="brand">Thương hiệu</label>
                  <input
                    className="form-control"
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="brand">Size</label>
                  <div className="row">
                    {sizes &&
                      sizes.map((size) => (
                        <div className=" col-md-3" key={size}>
                          <input
                            type="checkbox"
                            value={size}
                            style={{ marginRight: '4px' }}
                            onChange={onSelectSize}
                            aria-label="Checkbox for following text input"
                          />
                          {size}
                        </div>
                      ))}
                  </div>
                </li>
                <li>
                  <label htmlFor="brand">Đặc tính</label>
                  <input
                    className="form-control"
                    type="text"
                    name="attributes"
                    id="attributes"
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="price">Giá</label>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="stock">Màu Sắc</label>
                  <input
                    className="form-control"
                    type="text"
                    name="stock"
                    id="stock"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  ></input>
                </li>
                <li>
                  <label htmlFor="description">chi tiết</label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="description"
                    value={description}
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </li>

                <li>
                  <button className="btn btn-danger" type="submit">
                    {id ? 'Cập nhật' : 'Thêm sản phẩm'}
                  </button>
                </li>
              </ul>
            </form>
          </div>
        )}
        <div
          className="list-product-add  "
          className={!openmodalVisible ? 'col-md-12' : 'col-md-7'}
        >
          <table className="table">
            <tbody>
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : error ? (
                <div className="">loading</div>
              ) : (
                products && (
                  <Table
                    responsive
                    columns={columnList}
                    dataSource={products}
                  ></Table>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardScreen>
  );
};

export default ProductAdminScreen;
