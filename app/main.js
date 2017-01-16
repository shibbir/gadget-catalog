import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './containers/EnsureLoggedOutContainer';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Welcome}></IndexRoute>

            <Route component={EnsureLoggedOutContainer}>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Route>

            <Route component={EnsureLoggedInContainer}>
                <Route path="dashboard" component={Dashboard}/>
            </Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
