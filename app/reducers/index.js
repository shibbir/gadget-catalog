import { combineReducers } from 'redux';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    authReducer,
    itemReducer,
    brandReducer,
    categoryReducer
})
