
import { set } from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link} from 'react-router-dom';
import { changePwd, getFullInfoUser, resetPwd, updateInfoUser } from '../../actions/userActions';
import ProfileScreen from './profile';

export default function ProfileUserScreen(props) {
    const [full_name, setFull_name] = useState('');
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')
    const [new_password, setNew_password] = useState('')
    const [confirm_new_password, setConfirm_new_password] = useState('')

    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const getFullInfo = useSelector((state )=>  state.getFullInfo)
    const { userFullInfo, loading ,error } = getFullInfo;
  
    useEffect(() => {
        dispatch(getFullInfoUser());
        return () => {  
        }
    }, []);
    const submidHandler = (e ) =>{
        e.preventDefault();
        dispatch(updateInfoUser(full_name,gender,birthday));
    }
    const openModal = () => {
        setOpen(!open)
    }
    const submidHandlerPwd = (e) =>{
        e.preventDefault();
        dispatch(changePwd(new_password, confirm_new_password));
    }
  return <ProfileScreen>
      {     loading ?   <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
            :
            error ? <div>{error}</div>
            : 
            !open && userFullInfo && userFullInfo.data && <div className="profileuser" style={{marginTop : '20px'}}>                    
                        <form onSubmit={submidHandler}>
                        <div className="form-group">
                            <label >Email </label>
                            <input type="email" className="form-control"   placeholder={userFullInfo.data.email}  disabled />
                        </div>
                        <div className="form-group">
                            <label >Số điện thoại</label>
                            <input type="text" className="form-control" placeholder={userFullInfo.data.phone_number}  disabled />
                        </div>
                        <div className="form-group">
                            <label >Họ và tên</label>
                            <input type="text" className="form-control"  value = { full_name } onChange={e => setFull_name(e.target.value)} placeholder="cập nhật tên của bạn .." />
                        </div>
                        <div className="form-group">
                            <label >Giới tính</label>
                            <select className="custom-select" value={gender}   onChange={e => setGender(e.target.value)} >
                                <option selected >Choose...</option>
                                <option value="male" >Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Ngày sinh</label>
                            <input type="date" className="form-control"  value = { birthday}  onChange={e => setBirthday(e.target.value)} />
                        </div>
                        <div className="form-group form-check">
                        </div>
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                        <button className="btn btn-dark" onClick={openModal}>Đổi mật khẩu</button>
                    </form> 
                    
            </div>
}
{
                        open && (
                            <form onSubmit={submidHandlerPwd}>
                                <div className="form-group">
                                    <label >Old Password </label>
                                    <input type="password" className="form-control"   />
                                </div>
                                <div className="form-group">
                                    <label > New Password </label>
                                    <input type="password" className="form-control" value={new_password}  onChange={ e => setNew_password(e.target.value)}  />
                                </div>
                                <div className="form-group">
                                    <label >Repassword </label>
                                    <input type="password" className="form-control"   value={confirm_new_password}  onChange={ e => setConfirm_new_password(e.target.value)}  />
                                </div>
                             
                                <div className="form-group form-check">
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={() => setOpen(false)}>Đóng</button>
                                <button type="submit" className="btn btn-dark">Xong</button>
                            </form> 
                        )
                    }
                
  </ProfileScreen>
  
}



