import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import { Pagination, Spin } from 'antd';

const StaffAdminScreen = (props) => {
  const getUserAdmin = useSelector((state) => state.getUserAdmin);
  const { users, loading, error, total } = getUserAdmin;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAdmin({ page, limit, role: 'staff' }));
    return () => {};
  }, [page, limit]);
  const onPaginationChange = (current, pageSize) => {
    setPage(current);
    setLimit(pageSize);
  }
  return (
    <DashboardScreen>
      <div className="maine">
        <h3>Nhân viên</h3>
        {/* <button
          className='btn btn-danger ab-right'
          onClick={() => openModal({})}
        >
          Thêm nhân viên
        </button> */}
      </div>
      {userInfo && userInfo.user && userInfo.user.role == 'admin' ? (
        <Spin spinning={loading}>
        <div className="list-product-add  ">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên Nhân Viên</th>
                <th scope="col">Điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map(
                  (user, index) =>
                    user.role === 'staff' && (
                      <tr key={index}>
                        <td>
                          {user.full_name ? (
                            user.full_name
                          ) : (
                            <p className="text-primary">chưa cập nhật</p>
                          )}
                        </td>
                        <td>{user.phone_number}</td>
                        <td>{user.email}</td>
                        <td>
                          <div className={'label-custom label-' + user.status}>
                            {user.status === 'active' ? 'Đang hoạt động' : 'Đã vô hiệu'}
                          </div>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
          <Pagination 
            pageSize={limit ? limit : 30}
            current={page ? page : 1}
            total={total}
            pageSizeOptions={[10, 20, 30]}
            onChange={onPaginationChange}
            showTotal={(total, range) => `Có ${range[0], range[1]} sản phẩm`}
            showSizeChanger
            style={{ textAlign: 'right' }}
          />
        </div>
        </Spin>
      ) : (
        <div> bạn không có quyền truy cập vào trang này</div>
      )}
    </DashboardScreen>
  );
};

export default StaffAdminScreen;
