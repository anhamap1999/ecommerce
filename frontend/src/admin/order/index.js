import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListOrdersAdmin,
  updateStatusOrder,
} from '../../actions/orderAction';
import DashboardScreen from '../dashboard';
import { Space, Table, Tabs } from 'antd';
import { FaEye } from 'react-icons/fa';
import utils from '../../modules/utils';
import OrderDetail from './orderDetail';


const { TabPane } = Tabs;
const statusDefined = {
  handling: 'Đang xử lý',
  picking: 'Đang lấy hàng',
  delivering: 'Đang giao',
  delivered: 'Đã giao',
  completed: 'Đã hoàn tất',
  lost_damage: 'Mất hoặc hư hỏng',
  user_cancel: 'Người dùng hủy',
  shop_cancel: 'Shop hủy',
};

const OrderAdminScreen = (props) => {
  const listOrderAdmin = useSelector((state) => state.listOrderAdmin);
  const { orders, loading, error, total } = listOrderAdmin;
  const { loadingUpdating = false, success = false } = useSelector(
    (state) => state.orderSave
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [status, setStatus] = useState('');
  const [modalVisible, setVisible] = useState(false);
  const [selectedOrder, setOrder] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListOrdersAdmin({ page, limit, status }));
    return () => {};
  }, [page, limit, status]);

  const onPaginationChange = ({ pageSize, current }) => {
    setPage(current);
    setLimit(pageSize);
    dispatch(getListOrdersAdmin({ page: current, limit: pageSize, status }));
  };
  const changeState = async (id, status) => {
    await dispatch(updateStatusOrder(id, { status }));
    setStatus('');
    await dispatch(getListOrdersAdmin({ page, limit, status: '' }));
  };

  const onChangeStatus = (status) => {
    setStatus(status);
    dispatch(getListOrdersAdmin({ page, limit, status }));
  }

  const onCancel = () => {
    setOrder({});
    setVisible(false);
  }

  const generateOption = (status) => {
    let options = null;
    switch (status) {
      case 'handling':
        options = Object.entries(statusDefined).filter(
          (i) =>
            i[0] !== 'handling' &&
            ['picking', 'user_cancel', 'shop_cancel'].includes(i[0])
        );
        break;
      case 'picking':
        options = Object.entries(statusDefined).filter(
          (i) => i[0] !== 'picking' && i[0] === 'delivering'
        );
        break;
      case 'delivering':
        options = Object.entries(statusDefined).filter(
          (i) =>
            i[0] !== 'delivering' && ['delivered', 'lost_damage'].includes(i[0])
        );
        break;

      default:
        break;
    }
    return options;
  };

  const columnList = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text) => text + 1,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text) => (text ? text.full_name : ''),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment',
      key: 'payment',
      render: (text) =>
        text
          ? text.paymentMethod === 'cash'
            ? 'Tiền mặt'
            : 'Qua chuyển khoản'
          : '',
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'shipping',
      key: 'shipping',
      render: (text) => (text ? text.normalizedAddress : ''),
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'order_items',
      key: 'order_items',
      align: 'center',
      render: (text) =>
        text && text.length ? text.reduce((t, i) => t + i.quantity, 0) : 0,
    },
    {
      title: 'Tổng tiền hàng',
      dataIndex: 'items_price',
      key: 'items_price',
      render: (text) => utils.vndFormat(text ? text : 0),
    },

    {
      title: 'Thuế',
      dataIndex: 'tax_price',
      key: 'tax_price',
      render: (text) => utils.vndFormat(text ? text : 0),
    },
    {
      title: 'Phí vận chuyển',
      dataIndex: 'shipping_price',
      key: 'shipping_price',
      render: (text) => utils.vndFormat(text ? text : 0),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (text) => utils.vndFormat(text ? text : 0),
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
      render: (key, record) => {
        const options = generateOption(key.status);
        return (
          <>
            <Space size='middle'>
              {options && options.length ? (
                <select
                  className='custom-select'
                  id='inputGroupSelect01'
                  onChange={(e) => changeState(record._id, e.target.value)}
                >
                  <option value={key.status} selected>
                    {statusDefined[key.status] ? statusDefined[key.status] : ''}
                  </option>
                  {options && options.length
                    ? options.map((i) => <option value={i[0]}>{i[1]}</option>)
                    : ''}
                </select>
              ) : key.status === 'delivered' ? (
                'Chờ khách hàng hoàn tất'
              ) : (
                'Không có'
              )}
            </Space>
          </>
        );
      },
    },
    {
      title: 'Xem chi tiết',
      render: (record) => (
        <FaEye style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => {
          setOrder(record);
          setVisible(true);
        }}  />
      ),
    },
  ];

  return (
    <DashboardScreen>
      <h3>Danh sách đặt hàng</h3>
      <div>
        <Tabs
          className='custom-tabs'
          activeKey={status}
          tabPosition={'top'}
          onChange={(value) => onChangeStatus(value)}
        >
          <TabPane tab='Tất cả' key='' />
          {Object.entries(statusDefined).map((i) => (
              <TabPane tab={i[1]} key={i[0]} />
            ))}
        </Tabs>
      </div>
      <div className=''>
        <div className='row'>
          <div
            className='list-product-add  '
            // className={!openmodalVisible ? 'col-md-12' : 'col-md-7'}
          >
            <Table
              responsive
              columns={columnList}
              dataSource={
                orders && orders.length
                  ? orders.map((item, index) => ({ ...item, key: index }))
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
              loading={loading || loadingUpdating}
              onChange={onPaginationChange}
            ></Table>
          </div>
        </div>
        <OrderDetail order={selectedOrder} onCancel={onCancel} modalVisible={modalVisible} /> 
      </div>
    </DashboardScreen>
  );
};

export default OrderAdminScreen;
