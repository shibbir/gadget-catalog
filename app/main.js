import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { IntlProvider } from 'react-intl';

import store from './store';
import App from './pages/App';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import ItemListPage from './pages/ItemListPage';
import ItemAddPage from './pages/ItemAddPage';
import ItemEditPage from './pages/ItemEditPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import ItemImagePage from './pages/ItemImagePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryEditPage from './pages/CategoryEditPage';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './containers/EnsureLoggedOutContainer';

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale='en'>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Welcome}></IndexRoute>

                    <Route component={EnsureLoggedOutContainer}>
                        <Route path="login" component={Login}/>
                        <Route path="register" component={Register}/>
                    </Route>

                    <Route component={EnsureLoggedInContainer}>
                        <Route path="dashboard" component={DashboardPage}/>
                        <Route path="items" component={ItemListPage}/>
                        <Route path="items/add" component={ItemAddPage}/>
                        <Route path="items/:id" component={ItemDetailsPage}/>
                        <Route path="items/:id/edit" component={ItemEditPage}/>
                        <Route path="items/:id/images" component={ItemImagePage}/>
                        <Route path="categories" component={CategoriesPage}/>
                        <Route path="categories/:id/edit" component={CategoryEditPage}/>
                    </Route>
                </Route>
            </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
