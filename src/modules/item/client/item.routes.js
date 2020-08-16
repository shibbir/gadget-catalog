import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Items from "./components/items.component";
import ItemForm from "./components/item-form.component";
import Item from "./components/item.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function ItemRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Items}/>
            <PrivateRoute path={`${path}/add`} component={ItemForm}/>
            <PrivateRoute exact path={`${path}/:id`} component={Item}/>
            <PrivateRoute exact path={`${path}/:id/edit`} component={ItemForm}/>
        </Switch>
    );
}
