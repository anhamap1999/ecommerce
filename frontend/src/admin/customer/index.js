import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfoAdmin } from '../../actions/userActions';
import DashboardScreen from '../dashboard';
import CustomerAdminInfo from './customer';
const CustomerAdminScreen = (props) => {
  const getUserAdmin = useSelector((state) => state.getUserAdmin);
  const { users, loading = false, error, total } = getUserAdmin;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAdmin({ page, limit, role: 'customer' }));
    return () => {};
  }, [page, limit]);
  return (
    <DashboardScreen>
      <div className="maine">
        <h3>Khách hàng</h3>
      </div>
      {(
        <CustomerAdminInfo usersData={users} total={total} loading={loading} page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      )}
    </DashboardScreen>
  );
};

export default CustomerAdminScreen;
