import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { applyMiddleware, createStore, compose } from 'redux';
import reducers from './reducers';

const middlewares = [promiseMiddleware(), thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

export default compose(applyMiddleware(...middlewares))(createStore)(reducers);
