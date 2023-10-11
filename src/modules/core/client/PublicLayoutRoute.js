import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function PublicLayoutRoute() {
    const location = useLocation();
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        loggedInUser ? (
            <Navigate to={ location.state?.from?.pathname || "/" } state={{ from: location }} replace/>
        ) : (
            <Outlet/>
        )
    );
}
