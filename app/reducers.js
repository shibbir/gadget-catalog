import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import itemReducer from "./item/item.reducer";
import brandReducer from "./brand/brand.reducer";
import categoryReducer from "./category/category.reducer";
import notificationReducer from "./shared/components/Notification/notification.reducer";

export default combineReducers({
    userReducer,
    itemReducer,
    brandReducer,
    categoryReducer,
    notificationReducer
})
