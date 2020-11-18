const { CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, CATEGORY_SAVE_FAIL } = require("../constants/categoryConstants");

// function productListReducer(state = { products: [] }, action) {
//     switch (action.type) {
//       case CATEGORY_SAVE_REQUEST:
//         return { loading: true, products : [] };
//       case CATEGORY_SAVE_SUCCESS:
//         return { loading: false, products: action.payload };
//       case CATEGORY_SAVE_FAIL:
//         return { loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   }
  function categorySaveReducer(state = { category : {} }, action) {
    switch (action.type) {
      case CATEGORY_SAVE_REQUEST:
        return { loading: true };
      case CATEGORY_SAVE_SUCCESS:
        return { loading : false, success: true , category: action.payload };
      case CATEGORY_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export {categorySaveReducer};