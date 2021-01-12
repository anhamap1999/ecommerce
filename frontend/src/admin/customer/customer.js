import React from 'react';
const CustomerAdminInfo = ({ usersData }) => {
  return (
    <div className="">
      <div className="list-product-add  ">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên Khách hàng</th>
              <th scope="col">Chức năng</th>
              <th scope="col">Điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {usersData &&
              usersData.map(
                (user) =>
                  user.role == 'customer' && (
                    <tr>
                      <td>
                        {user.full_name ? (
                          user.full_name
                        ) : (
                          <p className="text-primary">chưa cập nhật</p>
                        )}
                      </td>
                      <td>{user.role}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                      <td>
                        <button className="btn btn-danger">Sửa</button>
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerAdminInfo;
