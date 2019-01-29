import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import messageReducer from './shared/reducers/message.reducer';
import authReducer from './user/reducers/auth.reducer';
import dashboardReducer from './user/reducers/dashboard.reducer';
import itemReducer from './item/item.reducer';
import brandReducer from './brand/brand.reducer';
import categoryReducer from './category/category.reducer';

export default combineReducers({
    form: formReducer,
    authReducer,
    itemReducer,
    brandReducer,
    categoryReducer,
    dashboardReducer,
    messageReducer
})
