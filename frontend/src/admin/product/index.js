import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatogoryAll } from '../../actions/categoryAction';
import {
  listProductsAdmin,
  removeProductID,
  updateStateProduct,
  changeAddProductFields,
  changeFields,
  changeAdminProductFields,
} from '../../actions/productActions';
import DashboardScreen from '../dashboard';
import { Space, Table, Avatar, Tooltip } from 'antd';
import { getConfig } from '../../actions/configAction';
import Column from 'antd/lib/table/Column';
import utils from '../../modules/utils';
import CreateProduct from './createProduct';
import { AiFillEdit } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const statusDefined = {
  approved: 'Đang bán',
  pending: 'Chờ duyệt',
  rejected: 'Bị từ chối',
  disabled: 'Ngừng kinh doanh',
};
const ProductAdminScreen = (props) => {
  const [updateState, setUpdateState] = useState('');
  const { products, loading, total, error, query } = useSelector(
    (state) => state.productState
  );
  const { limit, page, status } = query;

  const { configs } = useSelector((state) => state.config);

  const colorIndex =
    configs && configs.findIndex((item) => item.key === 'color');
  const colors = configs[colorIndex] ? configs[colorIndex].value : [];

  const dispatch = useDispatch();

  const onPaginationChange = ({ pageSize, current }) => {
    dispatch(
      changeAdminProductFields({
        'query.page': current,
        'query.limit': pageSize,
      })
    );
    dispatch(listProductsAdmin({ page: current, limit: pageSize }));
  };
  const changeState = async (productId, state) => {
    await dispatch(updateStateProduct(productId, { status: state }));
    await dispatch(listProductsAdmin(query));
  };
  useEffect(() => {
    dispatch(listProductsAdmin({ page: 1, limit: 30 }));
    dispatch(getCatogoryAll());
    dispatch(getConfig());
    return () => {
      dispatch(
        changeAdminProductFields({
          products: [],
          total: 0,
          'query.page': 1,
          'query.limit': 30,
        })
      );
    };
  }, []);
  // useEffect(() => {
  //   if (successful) {
  //     setModalVisible(false);
  //   }
  //   return () => {};
  // }, [successful, successdelete]);
  // useEffect(() => {
  // if (successful) {
  //   setModalVisible(false);
  // }
  //   return () => {};
  // }, [successdelete]);

  const openModal = (product) => {
    if (product.id) {
      dispatch(changeAdminProductFields({ modalVisible: true }));
    } else {
      dispatch(
        changeAdminProductFields({
          'product.name': product.name,
          'product.images': product.images,
          'product.thumbnail': product.thumbnail,
          'product.SKU': product.SKU,
          'product.description': product.description,
          'product.size': product.size,
          'product.brand': product.brand,
          'product.color': product.color,
          'product.price': product.price,
          'product.category_id': product.category_id
            ? product.category_id._id
            : '',
          'product.id': product._id,
          modalVisible: true,
        })
      );
    }
  };
  const onChangeStatus = (value) => {
    dispatch(changeAdminProductFields({ 'product.status': value }));
  };

  const columnList = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text) => text + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) => <Avatar shape='square' src={text} size={50} />,
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
      render: (text) => utils.vndFormat(text),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (text, record, index) => text.name,
    },
    {
      title: 'Màu',
      dataIndex: 'color',
      key: 'color',
      render: (text) => (
        <Tooltip title={colors ? colors[text] : ''}>
          <span
            className={`color-circle`}
            style={{
              margin: '5px',
              backgroundColor: text,
              textAlign: 'center',
            }}
            key={text}
          ></span>
        </Tooltip>
      ),
    },
    {
      title: 'Lượt thích',
      dataIndex: 'likes_count',
      key: 'likes_count',
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold_count',
      key: 'sold_count',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <div className={'label-custom label-' + text}>
          {statusDefined[text]}
        </div>
      ),
    },
    {
      title: 'Tùy chỉnh',
      // key: 'key',
      render: (key, record) => (
        <>
          <Space size='middle'>
            <select
              className='custom-select'
              id='inputGroupSelect01'
              onChange={(e) => changeState(record._id, e.target.value)}
            >
              <option value={key.status} selected>
                {statusDefined[key.status] ? statusDefined[key.status] : ''}
              </option>
              {key.status !== 'rejected'
                ? Object.entries(statusDefined)
                    .filter(
                      (i) =>
                        i[0] !== key.status &&
                        ((key.status === 'pending' && i[0] !== 'disabled') ||
                          (['approved', 'disabled'].includes(key.status) &&
                            i[0] !== 'pending'))
                    )
                    .map((i) => <option value={i[0]}>{i[1]}</option>)
                : ''}
            </select>
          </Space>
        </>
      ),
    },
    {
      title: '',
      key: 'key',
      render: (key, record) => (
        <Space size='middle'>
          {/* <button className='btn btn-primary' onClick={() => openModal(record)}>
            Sửa
          </button> */}
          <Tooltip title='Sửa'>
            <span
              onClick={() => openModal(record)}
              style={{ cursor: 'pointer' }}
            >
              <AiFillEdit style={{ fontSize: '20px' }} />
            </span>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Xem chi tiết',
      render: (record) => (
        <Link to={`/product/${record._id}`}>
          <FaEye style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Link>
      ),
    },
  ];

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
        <div
          className='list-product-add  '
          // className={!openmodalVisible ? 'col-md-12' : 'col-md-7'}
        >
          <Table
            responsive
            columns={columnList}
            dataSource={
              products && products.length
                ? products.map((item, index) => ({ ...item, key: index }))
                : []
            }
            pagination={{
              current: page ? page : 1,
              total: total,
              pageSize: limit ? limit : 30,
              pageSizeOptions: [10, 20, 30],
              showTotal: (total) => `Có ${total} sản phẩm`,
              showSizeChanger: true,
            }}
            loading={loading}
            onChange={onPaginationChange}
          ></Table>
          {/* )
              )} */}
          {/* </tbody>
          </table> */}
        </div>
        <CreateProduct />
      </div>
    </DashboardScreen>
  );
};

export default ProductAdminScreen;
