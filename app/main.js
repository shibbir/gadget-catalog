import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { HashRouter } from "react-router-dom";

import store from "./store";
import App from "./core/App";

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale="en">
            <HashRouter>
                <App/>
            </HashRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById("app")
);
