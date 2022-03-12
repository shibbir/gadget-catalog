import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute() {
    const location = useLocation();
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        loggedInUser ? <Navigate to="/" state={{ from: location }} replace/> : <Outlet/>
    );
}
