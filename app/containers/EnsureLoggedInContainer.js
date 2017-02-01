import React from 'react';
import { hashHistory } from 'react-router';

export default class EnsureLoggedInContainer extends React.Component {
    componentWillMount() {
        let returnTo = this.props.location.query.return_to || 'dashboard';
        let token = localStorage.getItem('jwtToken');
        if(!token) {
            const { pathname } = this.props.location;
            hashHistory.replace({ pathname: 'login', query: { return_to: pathname }});
        }
    }

    render() {
        return this.props.children;
    }
}
