import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { addProduct, listProducts, removeProductID } from '../actions/productActions';
import HomePage from '../pages/homepage';

function CreateProductScreen(props) {
    const [openmodalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector( state => state.productList);
    const {products,loadding,error} = productList;
    const createProduct = useSelector(state =>state.createProduct);
    const {  loading:loadingadd , success: successful , error: erroradd  } = createProduct;
    const dispatch =useDispatch();

    const removeProduct = useSelector(state =>state.removeProduct);
    const {  loading:loadingdelete , success: successdelete , error: errordelete  } = removeProduct;
    useEffect(() => {
        if(successful){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
        };
    }, [successful,successdelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
    };
    const submitHandler = (e) => { 
        e.preventDefault();
        dispatch(addProduct( {
            _id:id,
            name,image,brand,price,stock,description } ));
    }
    const deleteproduct = (product) =>{
        dispatch(removeProductID(product._id));
    };
    
  return <HomePage>
       <button className="btn btn-light" onClick={ () => openModal({})}>create product</button>
      <div className="row">
      {
          openmodalVisible &&
          (<div className="create-form col-md-5">
            <form className="rounded border" onSubmit={submitHandler}>
                <h1>{id ? "Update" : "Add"}</h1><span onClick={()=>setModalVisible(false)}> close</span>
                <ul className="form-container">
                    <li>
                        {loadingadd && <div>Loading...</div>}
                        {erroradd && <div>{error}</div>}
                    </li>
                    <li className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input class="form-control" type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input class="form-control" type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input class="form-control" type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input class="form-control" type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="stock">
                            Stock
                        </label>
                        <input class="form-control" type="text" name="stock" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            description
                        </label>
                        <textarea class="form-control" type="text" name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </li>
                    
                    <li>
                    <button className="btn btn-primary" type="submit" >{ id ? "Update" : "Add"}</button>
                    </li>
                </ul>
            </form>
      
    </div>)
      }
      <div className="list-product-add  " className={ !openmodalVisible  ? "col-md-12" : "col-md-7"}>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">quanlity</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) =>
                                (
                                    <tr key = {product._id}>
                                        <th scope="row">{product._id}</th>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={ () => openModal(product) }>Edit</button>
                                            <button className="btn btn-dark"  onClick={ () => deleteproduct(product) }>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                    </table>
      </div> 
      
  </div>

  </HomePage>
}

export default CreateProductScreen;
