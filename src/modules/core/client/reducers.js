import { combineReducers } from "redux";

import userReducer from "../../user/client/user.reducer";
import itemReducer from "../../item/client/item.reducer";
import brandReducer from "../../brand/client/brand.reducer";
import categoryReducer from "../../category/client/category.reducer";

export default combineReducers({
    userReducer,
    itemReducer,
    brandReducer,
    categoryReducer
})
