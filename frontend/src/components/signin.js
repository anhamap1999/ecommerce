import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getFullInfoUser, signin } from '../actions/userActions';

function SigninScreen(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }

    return () => {};
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userName || !userName.length || !password || !password.length) {
      setFormError('Vui lòng nhập đầy đủ thông tin');
    } else {
      setFormError(null);
      dispatch(signin(userName, password));
    }
  };

  return (
    <div className="signin-form">
      <form
        className="box"
        onSubmit={submitHandler}
        action="index.html"
        method="post"
      >
        <h1>Đăng nhập</h1>

        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : null}
        {formError ? (
          <div style={{ color: 'white' }}>{formError}</div>
        ) : (
          error && (
            <div style={{ color: 'white' }}>
              {'Số điện thoại / email hoặc mật khẩu không đúng'}
            </div>
          )
        )}
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Số điện thoại hoặc email"
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        ></input>
        <input type="submit" value="Đăng nhập"></input>
        <Link
          to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
          className="register"
        >
          <span style={{ textDecoration: 'underline' }}>Đăng ký mới</span>
        </Link>
      </form>
    </div>
  );
}

export default SigninScreen;
