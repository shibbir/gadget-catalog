import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers";

const middlewares = [promise, thunk];

let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");

    middlewares.push(logger);

    if(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
}

export default composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducers);
