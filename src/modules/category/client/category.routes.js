import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Categories from "./components/categories.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function CategoryRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Categories}/>
        </Switch>
    );
}
