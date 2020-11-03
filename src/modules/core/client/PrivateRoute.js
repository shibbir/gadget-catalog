import React from "react";
import { useSelector } from "react-redux";
import { Container, Divider } from "semantic-ui-react";
import { Route, Redirect } from "react-router-dom";

import Footer from "./components/footer.component";
import Navbar from "./components/Navbar";

export default function PrivateRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <Route {...rest} render={props => {
            return (
                loggedInUser ? (
                    <>
                        <Navbar/>
                        <Container>
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
