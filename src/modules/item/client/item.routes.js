import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import ItemDetail from "./components/ItemDetail";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function ItemRoutes() {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={ItemList}/>
            <PrivateRoute path={`${path}/add`} component={ItemForm}/>
            <PrivateRoute exact path={`${path}/:id`} component={ItemDetail}/>
            <PrivateRoute exact path={`${path}/:id/edit`} component={ItemForm}/>
        </Switch>
    );
}
