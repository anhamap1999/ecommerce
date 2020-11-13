import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart } from '../actions/cartActions';
import {Link} from 'react-router-dom';
import HomePage from '../pages/homepage';
function CartScreen(props) {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1;

    const dispatch = useDispatch();
    const deleteHandler = (productId) => {
      dispatch(removeToCart(productId));
    }
    const redirectShipping = () => {
      props.history.push('/signin?redirect=shipping')
    }
    useEffect(() => {
      if(productId){
        dispatch(addToCart(productId,qty));
      }
    }, []);
  return <HomePage>
    <div className="cart-details">
      
      <div className="container">
         <div><h3>Your Cart</h3></div>
        <div className="row">
                <div className="col-md-8 col-12">
                   {cartItems.length == 0 ?
                   <div>your cart empty</div> :
                   cartItems.map( item =>
                    <div className="row yourcart">
                        <div className="col-md-4">
                          <img src={item.image}></img>
                        </div>
                        <div className="col-md-2">
                         <Link to={'/product/' + item.product} > {item.name}</Link>
                        </div>
                        <div className="col-md-2">
                            qty:
                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                              {[...Array(item.stock).keys()].map(x =>
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                              )}
                            </select>

                        </div>
                        <div className="col-md-2">
                          {item.price}
                        </div>
                        <div className="col-md-2">
                          <button className="delete-product" onClick={ () => deleteHandler(item.product) } >delete</button>
                        </div>
                    </div>
                   )}
                </div>
                <div className="col-md-4 col-12">
                    <div className="total-cart">
                        <h3>Details Cart</h3>
                        <p>
                        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                            :
                        $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                        </p>
                        <button onClick={redirectShipping}>Check Out</button>
                    </div>
                </div>
        </div>
      </div>
  </div>
  </HomePage>
}


export default CartScreen;
