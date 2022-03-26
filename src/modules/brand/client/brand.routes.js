import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Brands from "./brands.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function BrandRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Brands}/>
        </Switch>
    );
}
