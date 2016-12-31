import React from 'react';

export default class Navigation extends React.Component {
    render() {
        const navbarStyle = {
            borderRadius: 0
        };

        return (
            <nav class="navbar navbar-dark bg-inverse" style={navbarStyle}>
                <div class="container">
                    <h1 class="navbar-brand mb-0">Digital Catalog!!</h1>
                    <div class="nav navbar-nav">
                        <a class="nav-item nav-link" href="#">Dashboard</a>
                        <a class="nav-item nav-link" href="#">Add in item</a>
                    </div>
                    <div class="nav navbar-nav float-xs-right">
                        <a class="nav-item nav-link" href="#">Sign in</a>
                        <a class="nav-item nav-link btn btn-outline-success" href="#">Sign up</a>
                    </div>
                </div>
            </nav>
        );
    }
}
