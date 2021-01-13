import React from 'react';
import { Pagination, Spin } from 'antd';
const CustomerAdminInfo = ({ usersData, ...props }) => {
  const onPaginationChange = ({ current, pageSize}) => {
    props.setPage(current);
    props.setLimit(pageSize);
  }
  return (
    
    <div className="">
      <div className="list-product-add  ">
      <Spin spinning={props.loading}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên Khách hàng</th>
              <th scope="col">Điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {usersData &&
              usersData.map(
                (user, index) =>
                  user.role === 'customer' && (
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
        </Spin>
        <Pagination 
            pageSize={props.limit ? props.limit : 30}
            current={props.page ? props.page : 1}
            total={props.total ? props.total : 0}
            pageSizeOptions={[10, 20, 30]}
            onChange={onPaginationChange}
            showTotal={(total) => `Có ${total} sản phẩm`}
            showSizeChanger
            style={{ textAlign: 'right' }}
          />
      </div>
    </div>
  );
};

export default CustomerAdminInfo;
