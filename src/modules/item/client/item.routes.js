import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Item from "./components/item.component";
import Items from "./components/items.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function ItemRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Items}/>
            <PrivateRoute exact path={`${path}/:id`} component={Item}/>
        </Switch>
    );
}
