import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Vendors from "./vendors.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function VendorRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Vendors}/>
        </Switch>
    );
}
