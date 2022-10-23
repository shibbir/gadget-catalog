import thunkMiddleware from "redux-thunk";
import promise from "redux-promise-middleware";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

export default configureStore({
    reducer: reducers,
    middleware: [promise, thunkMiddleware]
});
