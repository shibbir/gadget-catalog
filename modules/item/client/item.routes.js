import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import ItemAddPage from "./pages/ItemAddPage";
import ItemEditPage from "./pages/ItemEditPage";
import ItemList from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function ItemRoutes() {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={ItemList}/>
            <PrivateRoute path={`${path}/add`} component={ItemAddPage}/>
            <PrivateRoute path={`${path}/:id`} component={ItemDetailContainer}/>
            <PrivateRoute path={`${path}/:id/edit`} component={ItemEditPage}/>
        </Switch>
    );
}
