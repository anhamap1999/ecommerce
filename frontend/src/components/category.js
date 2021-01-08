import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCategory } from '../actions/categoryAction';

import HomePage from '../pages/homepage';

function AddCategoryScreen(props) {
    const [categoryName,setCategoryName] = useState('');
   
    const dispatch =useDispatch();

    useEffect(() => {
        
        return () => {
        };
    }, []);
    const submitHandler = (e) =>{
        e.preventDefault();
       
    }
  return <HomePage>
      <div className="container">
      <form className="rounded border " onSubmit={submitHandler}>
                <h1> Create Category</h1>
                <ul className="form-container">             
                    <li className="form-group">
                        <label htmlFor="categoryName">
                          CategoryName
                        </label>
                        <input class="form-control" type="text" name="categoryName" value={categoryName} id="categoryName" onChange={(e) => setCategoryName(e.target.value)} ></input>
                    </li>
                    <li>
                    <button className="btn btn-primary" type="submit" >Save Category</button>
                    </li>
                </ul>
            </form> 
      </div>
  </HomePage>
}

export default AddCategoryScreen;
