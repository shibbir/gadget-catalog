import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import "fomantic-ui-css/semantic.css";
import "izitoast/dist/css/izitoast.css";
import "draft-js/dist/Draft.css";
import "./app.component.css";

import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../../user/client/components/Login";
import Register from "../../user/client/components/Register";
import ResetPassword from "../../user/client/components/ResetPassword";
import Profile from "../../user/client/components/Profile";
import Dashboard from "../../user/client/components/Dashboard";
import ItemRoutes from "../../item/client/item.routes";
import BrandRoutes from "../../brand/client/brand.routes";
import CategoryRoutes from "../../category/client/category.routes";
import { getProfile } from "../../user/client/user.actions";

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        document.getElementById("loader").style = "display: block";
    } else if (refCount > 0) {
        refCount--;
        if(refCount > 0) document.getElementById("loader").style = "display: block";
        else document.getElementById("loader").style = "display: none";
    }
}

axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    setLoading(false);
    return response;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

const mapDispatchToProps = dispatch => {
    return {
        getProfile: function() {
            dispatch(getProfile());
        }
    };
};

class App extends React.Component {
    constructor(props) {
        super();
        props.getProfile();
    }

    render() {
        return (
            <Switch>
                <PublicRoute path="/login" component={Login}/>
                <PublicRoute path="/register" component={Register}/>
                <PublicRoute path="/reset-password" component={ResetPassword}/>

                <PrivateRoute exact path="/" component={Dashboard}/>
                <PrivateRoute path="/profile" component={Profile}/>

                <Route path="/items" component={ItemRoutes}/>

                <Route path="/brands" component={BrandRoutes}/>

                <Route path="/categories" component={CategoryRoutes}/>

                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
