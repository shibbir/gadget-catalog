import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import App from "./app.component";

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="en">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById("app")
);
