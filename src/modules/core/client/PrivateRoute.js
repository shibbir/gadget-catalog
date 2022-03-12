import React from "react";
import { useSelector } from "react-redux";
import { Container, Divider } from "semantic-ui-react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/footer.component";

export default function PrivateRoute() {
    const location = useLocation();
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        loggedInUser ?
            <>
                <Navbar/>
                <Container className="site-content">
                    <Outlet/>
                    <Divider hidden/>
                </Container>
                <Footer/>
            </>
            : <Navigate to="/login" state={{ from: location }} replace/>
    );
}
