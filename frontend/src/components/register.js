import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import { register } from '../actions/userActions';
function RegisterScreen(props) {
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const userRegister = useSelector(state =>state.userRegister);
    const {  loading , userInfo , error} = userRegister;
    const dispatch =useDispatch();
    const location = useLocation();
     const redirect = location.search ? location.search.split("=")[1]:'/';
   
    useEffect(() => {
       if(userInfo){
           props.history.push(redirect);
       }
        return () => {
        };
    }, [userInfo]);
    const submitHandler = (e) => { 
        e.preventDefault();
        dispatch(register(phone_number,email,password,confirm_password));
    }
  return <div className="signin-form">
      <form className="box" onSubmit={submitHandler}>
          <h1>Register</h1>
        
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </li>
            <li>
                 
                 <input type="text" placeholder="Phone number" name="phone_number" id="phone_number" onChange={(e) => setPhone_number(e.target.value)} ></input>
             </li>
             <li>
                 
                 <input type="text" placeholder="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} ></input>
             </li>
             <li>
                
                 <input type="password" name="password" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} ></input>
             </li>
             <li>
                 
                 <input type="password" name="confirm_password" placeholder="password" id="confirm_password" onChange={(e) => setConfirm_password(e.target.value)} ></input>
             </li>
             <li>
             <Link to={ redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="register">Create your account</Link>
             </li>
             <li>
                 <button type="submit" className="re-submit" >Register</button>
             </li>
        
      </form>
      
  </div>
}


export default RegisterScreen;
