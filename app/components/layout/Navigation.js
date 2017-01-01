import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends React.Component {
    render() {
        const navbarStyle = {
            borderRadius: 0
        };

        return (
            <nav class="navbar navbar-dark bg-inverse" style={navbarStyle}>
                <div class="container">
                    <IndexLink to="/" class="navbar-brand">Digital Catalog</IndexLink>
                    <div class="nav navbar-nav">
                        <Link to="dashboard" activeClassName="active" class="nav-item nav-link">Dashboard</Link>
                    </div>
                    <div class="nav navbar-nav float-xs-right">
                        <Link to="login" activeClassName="active" class="nav-item nav-link">Sign in</Link>
                        <Link to="register" activeClassName="active" class="nav-item nav-link btn btn-outline-success">Sign up</Link>
                    </div>
                </div>
            </nav>
        );
    }
}
