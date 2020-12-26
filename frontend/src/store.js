import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productAddReducer, productRemoveReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie';
import { getFullInfoReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { categorySaveReducer } from './reducers/categoryReducers';
import { orderSaveReducer, ordersListReducer } from './reducers/orderReduces';
import { addRessListReducer } from './reducers/delivery_addressReduce';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const userFullInfo = Cookie.getJSON('userFullInfo') || null;
const initialState = {  cart : { cartItems },
                        shipping: {}, payment: {},
                        userSignin : { userInfo },
                        getFullInfo : { userFullInfo },
                      } ;
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    getFullInfo :getFullInfoReducer,
    userSignin : userSigninReducer,
    userRegister :userRegisterReducer,
    createProduct: productAddReducer,
    removeProduct :productRemoveReducer,
    saveCategory :categorySaveReducer,
    orderSave : orderSaveReducer,
    odersList :ordersListReducer ,
    listAddress : addRessListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
export default store;