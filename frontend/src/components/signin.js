import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useHistory, useLocation} from 'react-router-dom';
import { signin } from '../actions/userActions';

function SigninScreen(props) {
    
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const userSignin = useSelector(state =>state.userSignin);
     const {  loading, userInfo , error} = userSignin;
     const dispatch =useDispatch();
     const history = useHistory();
     const location = useLocation();
     const redirect = location.search ? location.search.split("=")[1]:'/';
   
    useEffect(() => {
       if(userInfo){
           history.push(redirect);
       }
        return () => {
        };
    }, [userInfo]);
    const submitHandler = (e) => { 
        e.preventDefault();
        dispatch(signin(email,password));
    }




  return <div className="signin-form">
      <form class="box" onSubmit={submitHandler} action="index.html" method="post">
        <h1>Login</h1>
        <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username"></input>
        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
        <input type="submit"  value="Login"></input>
        <Link to={ redirect === "/" ? "register" : "register?redirect=" + redirect} className="register">Create your account</Link>
      </form>
  </div>
}


export default SigninScreen;
