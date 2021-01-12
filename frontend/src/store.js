import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productAddReducer,
  productRemoveReducer,
  productNewListReducer,
  productListAdminReducer
} from './reducers/productReducers';
import thunk from 'redux-thunk';
import { getProductCartReducer } from './reducers/cartReducers';
import {
  getFullInfoReducer,
  getUserInfoAdminReducer,
  userRegisterReducer,
  userSigninReducer,
} from './reducers/userReducers';
import {
  categorySaveReducer,
  getListCategoriesReducer,
} from './reducers/categoryReducers';
import { orderListAdminReducer, orderSaveReducer, ordersListReducer } from './reducers/orderReduces';
import { addRessListReducer } from './reducers/delivery_addressReduce';
import { getCommentProductReducer } from './reducers/commentReducer';
import { configReducer } from './reducers/configReducers';
<<<<<<< HEAD
import { getListOrdersAdmin } from './actions/orderAction';
import { getBankAccountReducer } from './reducers/bankReducer';

=======
import { stockReducer } from './reducers/stockReducers';
import { addressReducer } from './reducers/addressReducers';
import { bankReducer } from './reducers/bankReducers';
>>>>>>> a9c1674a2513e8c9790e3efd9f9608909fd02312

const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
const initialState = {
  shipping: {},
  payment: {},
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productListAdmin: productListAdminReducer,
  productDetails: productDetailsReducer,
  cartUser: getProductCartReducer,
  getFullInfo: getFullInfoReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  createProduct: productAddReducer,
  removeProduct: productRemoveReducer,
  saveCategory: categorySaveReducer,
  // orderSave: orderSaveReducer,
  ordersList: ordersListReducer,
  listAddress: addRessListReducer,
  getUserAdmin: getUserInfoAdminReducer,
  listCategories: getListCategoriesReducer,
  listCommentProduct: getCommentProductReducer,
  listNewProduct: productNewListReducer,
  config: configReducer,
<<<<<<< HEAD
  listOrderAdmin :  orderListAdminReducer,
  getListbank : getBankAccountReducer
=======
  stock: stockReducer,
  address: addressReducer,
  bank: bankReducer,
>>>>>>> a9c1674a2513e8c9790e3efd9f9608909fd02312
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
