import React from 'react';
import { Link } from 'react-router';

import { login } from '../actions/AuthActions';
import store from '../store';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = { email: '', password: '' };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleLogin(event) {
        event.preventDefault();

        store.dispatch(login({
            email: this.state.email,
            password: this.state.password
        }));
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Login</button> | <Link to="register">Sign up for a new account</Link>
            </form>
        );
    }
}
