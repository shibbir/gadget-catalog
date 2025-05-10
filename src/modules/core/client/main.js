import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import store from "./store";
import App from "./app.component";

const root = createRoot(document.getElementById("app"));

root.render(
    <Provider store={store}>
        <IntlProvider locale="en">
            <BrowserRouter future={{ v7_startTransition: true }}>
                <App/>
            </BrowserRouter>
        </IntlProvider>
    </Provider>
);
