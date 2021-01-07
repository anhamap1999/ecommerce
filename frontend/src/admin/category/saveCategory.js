import React from 'react';
import { useState } from 'react';
const FormSaveCategory = ( )  => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState('')
    const submitHandler = (e) =>{
        e.preventDefault();

    }

    return  <form className="rounded border" onSubmit={submitHandler}>
    
    <ul className="form-container">
       
        <li className="form-group">
            <label htmlFor="name">
                Tên danh mục
            </label>
            <input class="form-control" type="text" 
                    name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} ></input>
        </li>
        <li className="form-group">
            <label htmlFor="name">
                loại
            </label>
            <input class="form-control" type="number" 
                    name="name" value={type} id="type" onChange={(e) => setType(e.target.value)} ></input>
        </li>
        <li className="form-group">
            <label htmlFor="name">
                loại
            </label>
            <input class="form-control" type="number" 
                    name="name" value={type} id="type" onChange={(e) => setType(e.target.value)} ></input>
        </li>
        <li>
            <label htmlFor="image">
                Ảnh
            </label>
            <textarea class="form-control" type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)} ></textarea>
        </li>
        
        <li>
        <button className="btn btn-primary" type="submit" >Thêm</button>
        </li>
    </ul>
</form>
}

export default FormSaveCategory ;