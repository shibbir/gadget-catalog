import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import ViewItem from './pages/ViewItem';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './containers/EnsureLoggedOutContainer';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Welcome}></IndexRoute>

            <Route component={EnsureLoggedOutContainer}>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Route>

            <Route component={EnsureLoggedInContainer}>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="items/add" component={AddItem}/>
                <Route path="items/:id" component={ViewItem}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
