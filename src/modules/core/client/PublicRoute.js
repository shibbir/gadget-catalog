import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({ component: Component, ...rest }) {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);

    return (
        <Route {...rest} render={props => {
            return (
                loggedInUser ? (
                    <Redirect push to={{
                        pathname: props.location.state
                            ? props.location.state.from.pathname
                            : "/",
                        search: props.location.state
                            ? props.location.state.from.search
                            : "",
                        state: { from: props.location }
                    }} />
                ) : (
                    <Component {...props}/>
                )
            )
        }}/>
    );
}
