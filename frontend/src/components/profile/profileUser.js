import { set } from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  changePwd,
  getFullInfoUser,
  resetPwd,
  updateInfoUser,
  changeUserInfoFields
} from '../../actions/userActions';
import ProfileScreen from './profile';

export default function ProfileUserScreen(props) {
  // const [full_name, setFull_name] = useState('');
  // const [gender, setGender] = useState('');
  // const [birthday, setBirthday] = useState('');
  const [new_password, setNew_password] = useState('');
  const [confirm_new_password, setConfirm_new_password] = useState('');

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const getFullInfo = useSelector((state) => state.getFullInfo);
  const { userFullInfo, loading, error } = getFullInfo;
console.log(userFullInfo)
  const fetchdata = async() =>{
      await dispatch(getFullInfoUser());

  }
  useEffect(() => {
    fetchdata();
    return () => {};
  }, []);
  const submidHandler = (e) => {
    e.preventDefault();
    dispatch(updateInfoUser(userFullInfo.full_name, userFullInfo.gender, userFullInfo.birthday));
  };
  const openModal = () => {
    setOpen(!open);
  };
  const submidHandlerPwd = (e) => {
    e.preventDefault();
    dispatch(changePwd(new_password, confirm_new_password));
  };
  const onChange = (key, value) => {
    dispatch(changeUserInfoFields({['userFullInfo.' + key]: value}));
  }
  return (
    <ProfileScreen>
      {loading ? (
        <div className='spinner-border text-primary' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        !open &&
        userFullInfo && (
          <div className="profileuser" style={{ marginTop: '100px' }}>
            <form onSubmit={submidHandler}>
              <div className='form-group'>
                <label>Email </label>
                <input
                  type='email'
                  className='form-control'
                  placeholder={userFullInfo.email}
                  disabled
                />
              </div>
              <div className='form-group'>
                <label>Số điện thoại</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder={userFullInfo.phone_number}
                  disabled
                />
              </div>
              <div className='form-group'>
                <label>Họ và tên</label>
                <input
                  type='text'
                  className='form-control'
                  value={userFullInfo.full_name}
                  onChange={(e) => onChange('full_name', e.target.value)}
                  placeholder='cập nhật tên của bạn ..'
                />
              </div>
              <div className='form-group'>
                <label>Giới tính</label>
                <select
                  className='custom-select'
                  value={userFullInfo.gender}
                  onChange={(e) => onChange('gender', e.target.value)}
                >
                  <option selected>Choose...</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                  <option value='other'>Khác</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Ngày sinh</label>
                <input
                  type='date'
                  className='form-control'
                  value={userFullInfo.birthday}
                  onChange={(e) => onChange('birthday', e.target.value)}
                />
              </div>
              <div className='form-group form-check'></div>
              <button type='submit' className='btn btn-primary'>
                Cập nhật
              </button>
              <button className='btn btn-dark' onClick={openModal}>
                Đổi mật khẩu
              </button>
            </form>
          </div>
        )
      )}
      {open && (
        <form onSubmit={submidHandlerPwd} style={{ marginTop: '20px' }}>
          <div className='form-group'>
            <label>Mật khẩu cũ </label>
            <input type='password' className='form-control' />
          </div>
          <div className='form-group'>
            <label>Mật khẩu mới </label>
            <input
              type='password'
              className='form-control'
              value={new_password}
              onChange={(e) => setNew_password(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Nhập lại mật khẩu </label>
            <input
              type='password'
              className='form-control'
              value={confirm_new_password}
              onChange={(e) => setConfirm_new_password(e.target.value)}
            />
          </div>

          <div className='form-group form-check'></div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={() => setOpen(false)}
          >
            Đóng
          </button>
          <button type='submit' className='btn btn-dark'>
            Xong
          </button>
        </form>
      )}
    </ProfileScreen>
  );
}
