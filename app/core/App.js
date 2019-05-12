import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.css';
import 'izitoast/dist/css/izitoast.css';
import 'draft-js/dist/Draft.css';
import './app.css';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../user/pages/Login';
import Register from '../user/pages/Register';
import ProfileContainer from '../user/containers/ProfileContainer';
import ItemList from '../item/containers/ItemListContainer';
import ItemDetailContainer from '../item/containers/ItemDetailContainer';
import ItemAddPage from '../item/pages/ItemAddPage';
import ItemEditPage from '../item/pages/ItemEditPage';
import DashboardContainer from '../user/containers/DashboardContainer';
import CategoryListContainer from '../category/containers/CategoryListContainer';
import CategoryAddPage from '../category/pages/CategoryAddPage';
import CategoryEditPage from '../category/pages/CategoryEditPage';
import BrandListContainer from '../brand/containers/BrandListContainer';
import BrandAddPage from '../brand/pages/BrandAddPage';
import BrandEditPage from '../brand/pages/BrandEditPage';
import NoMatch from './NoMatch';

import { getProfile } from '../user/auth.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(getProfile())
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

                <PrivateRoute exact path="/" component={DashboardContainer} />
                <PrivateRoute exact path="/profile" component={ProfileContainer}/>
                <PrivateRoute exact path="/items" component={ItemList}/>
                <PrivateRoute exact path="/items/add" component={ItemAddPage}/>
                <PrivateRoute exact path="/items/:id" component={ItemDetailContainer}/>
                <PrivateRoute exact path="/items/:id/edit" component={ItemEditPage}/>

                <PrivateRoute exact path="/categories" component={CategoryListContainer}/>
                <PrivateRoute exact path="/categories/add" component={CategoryAddPage}/>
                <PrivateRoute exact path="/categories/:id/edit" component={CategoryEditPage}/>

                <PrivateRoute exact path="/brands" component={BrandListContainer}/>
                <PrivateRoute exact path="/brands/add" component={BrandAddPage}/>
                <PrivateRoute exact path="/brands/:id/edit" component={BrandEditPage}/>

                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
