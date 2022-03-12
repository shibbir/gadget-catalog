import React from "react";
import { Routes, useMatch } from "react-router-dom";
import Categories from "./components/categories.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function CategoryRoutes() {
    const { path } = useMatch();

    return (
        <Routes>
            <PrivateRoute exact path={path} component={Categories}/>
        </Routes>
    );
}
