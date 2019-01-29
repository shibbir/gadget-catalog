import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import messageReducer from './reducers/messageReducer';
import authReducer from './reducers/authReducer';
import itemReducer from './item/item.reducer';
import brandReducer from './reducers/brandReducer';
import categoryReducer from './reducers/categoryReducer';
import dashboardReducer from './reducers/dashboardReducer';

export default combineReducers({
    form: formReducer,
    authReducer,
    itemReducer,
    brandReducer,
    categoryReducer,
    dashboardReducer,
    messageReducer
})
