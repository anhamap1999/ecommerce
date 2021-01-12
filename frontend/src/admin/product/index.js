import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCatogoryAll } from '../../actions/categoryAction';
import {
  listProductsAdmin,
  removeProductID,
  updateStateProduct,
  changeAddProductFields,
  changeFields,
  changeAdminProductFields
} from '../../actions/productActions';
import DashboardScreen from '../dashboard';
import { Space, Table, Avatar, Tooltip } from 'antd';
import { getConfig } from '../../actions/configAction';
import Column from 'antd/lib/table/Column';
import utils from '../../modules/utils';
import CreateProduct from './createProduct';

const statusDefined = {
  approved: 'Đang bán',
  pending: 'Chờ duyệt',
  rejected: 'Bị từ chối',
  disabled: 'Ngừng kinh doanh',
};
const ProductAdminScreen = (props) => {
  const { products, loading, total, error, query } = useSelector(
    (state) => state.productState
  );
  const { limit, page, status } = query;

  const { configs } = useSelector((state) => state.config);

  const colorIndex =
    configs && configs.findIndex((item) => item.key === 'color');
  const colors = configs[colorIndex] ? configs[colorIndex].value : [];

  const dispatch = useDispatch();

  const onPaginationChange = () => {
    dispatch(listProductsAdmin({ page: 1, limit: 30 }));
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
          'product.category_id': product.category_id,
          'product.id': product.id,
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
      render: (text) => text + 1
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
      render: (text) => (colors[text] ? colors[text] : text),
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
      render: (key) => (
        <>
          {/* <Space size='middle'>
            <select
              className='custom-select'
              id='inputGroupSelect01'
              onChange={(e) => setUpdateState(e.target.value)}
            >
              <option value={key.status} selected>
                {key.status}
              </option>
              <option value='pending'>đang đợi</option>
              <option value='approved'>Cho bán</option>
              <option value='rejected'>Từ chối</option>
              <option value='disabled'>ngừng bán</option>
            </select>
          </Space> */}
        </>
      ),
    },
    {
      title: '',
      key: 'key',
      render: (key, record) => (
        <Space size='middle'>
          <button className='btn btn-primary' onClick={() => openModal()}>
            Cập nhật
          </button>
        </Space>
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
