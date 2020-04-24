import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import BrandAddPage from "./pages/BrandAddPage";
import BrandEditPage from "./pages/BrandEditPage";
import Brands from "./brands.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function BrandRoutes() {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Brands}/>
            <PrivateRoute path={`${path}/add`} component={BrandAddPage}/>
            <PrivateRoute path={`${path}/:id/edit`} component={BrandEditPage}/>
        </Switch>
    );
}
