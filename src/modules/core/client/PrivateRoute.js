import React from "react";
import { useSelector } from "react-redux";
import { Container, Divider } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/footer.component";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <Route {...rest} render={props => {
            return (
                loggedInUser ? (
                    <>
                        <Navbar/>
                        <Container className="site-content">
                            <Component {...props}/>
                            <Divider hidden/>
                        </Container>
                        <Footer/>
                    </>
                ) : (
                    <Redirect push to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}/>
                )
            )
        }}/>
    );
}
