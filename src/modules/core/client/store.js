import promise from "redux-promise-middleware";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

export default configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(promise)
});
