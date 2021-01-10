import {createStore, combineReducers,applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productAddReducer, productRemoveReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';

import { getFullInfoReducer, getUserInfoAdminReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { categorySaveReducer, getListCategoriesReducer } from './reducers/categoryReducers';
import { orderSaveReducer, ordersListReducer } from './reducers/orderReduces';
import { addRessListReducer } from './reducers/delivery_addressReduce';
import { getCommentProductReducer } from './reducers/commentReducer';
import { getProductCartReducer } from './reducers/cartReducers';


const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
const initialState = {  
                        shipping: {}, payment: {},
                        userSignin : { userInfo },
                      } ;
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cartUser : getProductCartReducer,
    getFullInfo :getFullInfoReducer,
    userSignin : userSigninReducer,
    userRegister :userRegisterReducer,
    createProduct: productAddReducer,
    removeProduct :productRemoveReducer,
    saveCategory :categorySaveReducer,
    orderSave : orderSaveReducer,
    odersList :ordersListReducer ,
    listAddress : addRessListReducer,
    getUserAdmin : getUserInfoAdminReducer,
    listCategories : getListCategoriesReducer,
    listCommentProduct : getCommentProductReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
export default store;