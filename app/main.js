import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import store from './store';
import App from './shared/pages/App';
import Login from './user/pages/Login';
import Register from './user/pages/Register';
import ProfilePage from './user/pages/ProfilePage';
import DashboardPage from './user/pages/DashboardPage';
import ItemListPage from './item/pages/ItemListPage';
import ItemAddPage from './item/pages/ItemAddPage';
import ItemEditPage from './item/pages/ItemEditPage';
import ItemDetailsPage from './item/pages/ItemDetailsPage';
import ItemImagePage from './item/pages/ItemImagePage';
import CategoryListPage from './category/pages/CategoryListPage';
import CategoryAddPage from './category/pages/CategoryAddPage';
import CategoryEditPage from './category/pages/CategoryEditPage';
import BrandListPage from './brand/pages/BrandListPage';
import BrandAddPage from './brand/pages/BrandAddPage';
import BrandEditPage from './brand/pages/BrandEditPage';
import EnsureLoggedInContainer from './user/containers/EnsureLoggedInContainer';
import EnsureLoggedOutContainer from './user/containers/EnsureLoggedOutContainer';

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
