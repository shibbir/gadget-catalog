import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import itemReducer from './itemReducer';
import brandReducer from './brandReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    form: formReducer,
    authReducer,
    itemReducer,
    brandReducer,
    categoryReducer
})
