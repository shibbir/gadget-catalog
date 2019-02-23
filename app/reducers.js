import { combineReducers } from 'redux';

import notificationReducer from './shared/components/Notification/notification.reducer';
import authReducer from './user/reducers/auth.reducer';
import dashboardReducer from './user/reducers/dashboard.reducer';
import itemReducer from './item/item.reducer';
import brandReducer from './brand/brand.reducer';
import categoryReducer from './category/category.reducer';

export default combineReducers({
    authReducer,
    itemReducer,
    brandReducer,
    categoryReducer,
    dashboardReducer,
    notificationReducer
})
