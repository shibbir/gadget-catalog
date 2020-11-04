import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import * as Sentry from "@sentry/browser";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import App from "./app.component";

if(typeof SENTRY_DSN !== "undefined" && typeof NODE_ENV !== "undefined" && NODE_ENV === "production") {
    Sentry.init({ dsn: SENTRY_DSN });
}

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
