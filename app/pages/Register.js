import React from 'react';

import * as AuthActions from '../actions/AuthActions';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = { name: '', email: '', password: '' };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleRegistration(event) {
        event.preventDefault();

        AuthActions.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <form onSubmit={this.handleRegistration}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange}/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        );
    }
}
