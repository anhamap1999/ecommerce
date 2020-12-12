
import { set } from 'js-cookie';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link} from 'react-router-dom';
import { getFullInfoUser, updateInfoUser } from '../../actions/userActions';
import ProfileScreen from './profile';

export default function ProfileUserScreen(props) {
    const [full_name, setFull_name] = useState('');
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')

    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const getFullInfo = useSelector(state =>  state.getFullInfo)
    const { userFulInfo, loading ,error } = getFullInfo;
    console.log("userFulInfo",userFulInfo)

    const submidHandler = (e ) =>{
        e.preventDefault();
        dispatch(updateInfoUser(full_name,gender,birthday));
    }
    const openModal = () => {
        setOpen(!open)
    }
    const submidHandlerPwd = (e) =>{
        e.preventDefault();
    }
  return <ProfileScreen>
      {     loading ? <div>loadding </div> 
            :
            error ? <div>{error}</div>
            : 
            !open && <div className="profileuser" style={{marginTop : '20px'}}>                    
                        <form onSubmit={submidHandler}>
                        <div className="form-group">
                            <label >Email </label>
                            <input type="email" className="form-control"    disabled />
                        </div>
                        <div className="form-group">
                            <label >Số điện thoại</label>
                            <input type="text" className="form-control"   disabled />
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
                                    <label >Password </label>
                                    <input type="password" className="form-control"     />
                                </div>
                                <div className="form-group">
                                    <label >Repassword </label>
                                    <input type="password" className="form-control"    />
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



