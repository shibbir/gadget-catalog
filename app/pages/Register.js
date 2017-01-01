import React from 'react';

export default class Register extends React.Component {
    render() {
        return (
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name"/>
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email address"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        );
    }
}
