import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import store from './store';
import App from './pages/App';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ItemListPage from './pages/ItemListPage';
import ItemAddPage from './pages/ItemAddPage';
import ItemEditPage from './pages/ItemEditPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import ItemImagePage from './pages/ItemImagePage';
import CategoryListPage from './pages/CategoryListPage';
import CategoryAddPage from './pages/CategoryAddPage';
import CategoryEditPage from './pages/CategoryEditPage';
import BrandListPage from './pages/BrandListPage';
import BrandAddPage from './pages/BrandAddPage';
import BrandEditPage from './pages/BrandEditPage';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './containers/EnsureLoggedOutContainer';

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale='en'>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="login"/>

                    <Route component={EnsureLoggedOutContainer}>
                        <Route path="login" component={Login}/>
                        <Route path="register" component={Register}/>
                    </Route>

                    <Route component={EnsureLoggedInContainer}>
                        <Route path="dashboard" component={DashboardPage}/>
                        <Route path="profile" component={ProfilePage}/>
                        <Route path="items" component={ItemListPage}/>
                        <Route path="items/add" component={ItemAddPage}/>
                        <Route path="items/:id" component={ItemDetailsPage}/>
                        <Route path="items/:id/edit" component={ItemEditPage}/>
                        <Route path="items/:id/images" component={ItemImagePage}/>
                        <Route path="categories" component={CategoryListPage}/>
                        <Route path="categories/add" component={CategoryAddPage}/>
                        <Route path="categories/:id/edit" component={CategoryEditPage}/>
                        <Route path="brands" component={BrandListPage}/>
                        <Route path="brands/add" component={BrandAddPage}/>
                        <Route path="brands/:id/edit" component={BrandEditPage}/>
                    </Route>
                </Route>
            </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('app')
);
