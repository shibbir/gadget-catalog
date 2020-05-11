import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import CategoryAddPage from "./pages/CategoryAddPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import CategoryListContainer from "./containers/CategoryListContainer";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function CategoryRoutes() {
    let { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={CategoryListContainer}/>
            <PrivateRoute path={`${path}/add`} component={CategoryAddPage}/>
            <PrivateRoute path={`${path}/:id/edit`} component={CategoryEditPage}/>
        </Switch>
    );
}
