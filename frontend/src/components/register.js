import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { register } from '../actions/userActions';
function RegisterScreen(props) {
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/signin';
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !phone_number ||
      !phone_number.length ||
      !password ||
      !password.length ||
      !email ||
      !email.length ||
      !confirm_password ||
      !confirm_password.length
    ) {
      setFormError('Vui lòng nhập đầy đủ thông tin');
    } else {
      setFormError(null);
      dispatch(register(phone_number, email, password, confirm_password));
    }
  };
  return (
    <div className='signin-form'>
      <form className='box' onSubmit={submitHandler}>
        <h1>Đăng ký</h1>

        <li>
          {loading && (
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
          {formError ? (
            <div style={{ color: 'white' }}>{formError}</div>
          ) : (
            error && (
              <div style={{ color: 'white' }}>
                {'Số điện thoại / email hoặc mật khẩu không đúng'}
              </div>
            )
          )}
        </li>
        <li>
          <input
            type='text'
            placeholder='Số điện thoại'
            name='phone_number'
            id='phone_number'
            onChange={(e) => setPhone_number(e.target.value)}
          ></input>
        </li>
        <li>
          <input
            type='text'
            placeholder='Địa chỉ email'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </li>
        <li>
          <input
            type='password'
            name='password'
            placeholder='Mật khẩu'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </li>
        <li>
          <input
            type='password'
            name='confirm_password'
            placeholder='Nhập lại mật khẩu'
            id='confirm_password'
            onChange={(e) => setConfirm_password(e.target.value)}
          ></input>
        </li>
        <li>
          <button type='submit' className='re-submit'>
            Đăng ký
          </button>
        </li>
      </form>
    </div>
  );
}

export default RegisterScreen;
