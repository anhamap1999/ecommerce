import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getStocks, changeFields } from '../../actions/stockAction';
import DashboardScreen from '../dashboard';
import { Space, Table, Avatar } from 'antd';
import utils from '../../modules/utils';
import ImportStock from './importStock';
const StorageAdminScreen = (props) => {
  // const getUserAdmin = useSelector((state) => state.getUserAdmin);
  // const { users, loading, error } = getUserAdmin;
  const stock = useSelector((state) => state.stock);
  const {
    stocks,
    loading,
    total,
    error,
    updating = {},
    query = {},
  } = stock;
  console.log('STOCK', stock)
  const { updatingLoading } = updating;
  const { page, limit } = query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStocks({ limit: 30, page: 1 }));
    return () => {};
  }, []);

  const openModal = (index) => {
    dispatch(
      changeFields({
        'updating.updatingIndex': index,
        'updating.modalVisible': true,
      })
    );
  };

  const onPaginationChange = ({ pageSize, current }) => {
    dispatch(
      changeFields({
        'query.page': current,
        'query.limit': pageSize,
      })
    );
    dispatch(getStocks({ page: current, limit: pageSize }));
  };

  const columnList = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text) => limit ? limit : 30 * (page ? page : 1 - 1) + text + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (text) => (text ? text.name : ''),
    },
    {
      title: 'Hình',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (text) => (
        <Avatar shape='square' src={text ? text.thumbnail : ''} size={50} />
      ),
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (text) => utils.vndFormat(text ? text.price : 0),
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '',
      key: 'key',
      render: (key, record, index) => (
        <Space size='middle'>
          <button className='btn btn-primary' onClick={() => openModal(index)}>
            Nhập kho
          </button>
        </Space>
      ),
    },
  ];
  return (
    <DashboardScreen>
      <div className='maine'>
        <h3>Quản lí kho</h3>
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
              stocks && stocks.length
                ? stocks.map((item, index) => ({ ...item, key: index }))
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
            loading={loading || updatingLoading}
            onChange={onPaginationChange}
          ></Table>
          {/* )
              )} */}
          {/* </tbody>
          </table> */}
        </div>
        <ImportStock />
      </div>
    </DashboardScreen>
  );
};

export default StorageAdminScreen;
