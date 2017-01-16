import React from 'react';
import { Link, IndexLink } from 'react-router';

import AuthStore from '../stores/AuthStore';
import * as AuthActions from '../actions/AuthActions';

export default class Navbar extends React.Component {
    logout() {
        AuthActions.logout();
    }

    render() {
        const isLoggedIn = AuthStore.isLoggedIn();

        return (
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <div class="container">
                    <IndexLink to="/" class="navbar-brand">Digital Catalog</IndexLink>
                    <div class="collapse navbar-collapse">
                        <div class="navbar-nav mr-auto">
                            { isLoggedIn &&
                                <Link to="dashboard" activeClassName="active" class="nav-item nav-link">Dashboard</Link>
                            }
                        </div>
                        { !isLoggedIn &&
                            <div class="navbar-nav">
                                <Link to="login" activeClassName="active" class="nav-item nav-link">Sign in</Link>
                                <Link to="register" activeClassName="active" class="nav-item nav-link btn btn-outline-success">Sign up</Link>
                            </div>
                        }
                        { isLoggedIn &&
                            <div class="navbar-nav">
                                <a href="javascript:void(0)" onClick={this.logout.bind(this)} class="nav-item nav-link">Sign out</a>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        );
    }
}
