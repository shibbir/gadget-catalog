import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navbar extends React.Component {
    logout() {
        this.props.logout();
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <div class="container">
                    <IndexLink to="/" class="navbar-brand">Digital Catalog</IndexLink>
                    <div class="collapse navbar-collapse">
                        { isLoggedIn &&
                            <div class="navbar-nav mr-auto">
                                <Link to="dashboard" activeClassName="active" class="nav-item nav-link">Dashboard</Link>
                                <Link to="items" activeClassName="active" class="nav-item nav-link">Item list</Link>
                                <Link to="items/add" activeClassName="active" class="nav-item nav-link">Add item</Link>
                                <Link to="categories" activeClassName="active" class="nav-item nav-link">Categories</Link>
                            </div>
                        }
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
