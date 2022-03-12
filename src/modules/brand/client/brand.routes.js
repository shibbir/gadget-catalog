import React from "react";
import { Routes, useMatch } from "react-router-dom";
import Brands from "./brands.component";
import PrivateRoute from "../../core/client/PrivateRoute";

export default function BrandRoutes() {
    const { path } = useMatch();

    return (
        <Routes>
            <PrivateRoute exact path={path} component={Brands}/>
        </Routes>
    );
}
