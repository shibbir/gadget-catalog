import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Retailers from "./retailers.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function RetailerRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Retailers}/>
        </Switch>
    );
}
