import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

import "fomantic-ui-css/semantic.css";
import "izitoast/dist/css/izitoast.css";
import "draft-js/dist/Draft.css";
import "./app.css";

import NoMatch from "./NoMatch";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../../user/client/components/Login";
import Register from "../../user/client/components/Register";
import ResetPassword from "../../user/client/components/ResetPassword";
import Profile from "../../user/client/components/Profile";
import Dashboard from "../../user/client/components/Dashboard";
import ItemAddPage from "../../item/client/pages/ItemAddPage";
import ItemEditPage from "../../item/client/pages/ItemEditPage";
import ItemList from "../../item/client/containers/ItemListContainer";
import ItemDetailContainer from "../../item/client/containers/ItemDetailContainer";
import CategoryAddPage from "../../category/client/pages/CategoryAddPage";
import CategoryEditPage from "../../category/client/pages/CategoryEditPage";
import CategoryListContainer from "../../category/client/containers/CategoryListContainer";
import BrandAddPage from "../../brand/client/pages/BrandAddPage";
import BrandEditPage from "../../brand/client/pages/BrandEditPage";
import Brands from "../../brand/client/brands.component";
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
                <PrivateRoute exact path="/profile" component={Profile}/>
                <PrivateRoute exact path="/items" component={ItemList}/>
                <PrivateRoute exact path="/items/add" component={ItemAddPage}/>
                <PrivateRoute exact path="/items/:id" component={ItemDetailContainer}/>
                <PrivateRoute exact path="/items/:id/edit" component={ItemEditPage}/>

                <PrivateRoute exact path="/categories" component={CategoryListContainer}/>
                <PrivateRoute exact path="/categories/add" component={CategoryAddPage}/>
                <PrivateRoute exact path="/categories/:id/edit" component={CategoryEditPage}/>

                <PrivateRoute exact path="/brands" component={Brands}/>
                <PrivateRoute exact path="/brands/add" component={BrandAddPage}/>
                <PrivateRoute exact path="/brands/:id/edit" component={BrandEditPage}/>

                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
