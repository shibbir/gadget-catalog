import React from 'react';
import { hashHistory } from 'react-router';

import store from '../store';

export default class EnsureLoggedOutContainer extends React.Component {
    componentWillMount() {
        let returnTo = this.props.location.query.return_to || 'dashboard';
        let token = localStorage.getItem('jwtToken');
        if(token) {
            hashHistory.replace(returnTo);
        }
    }

    render() {
        return this.props.children;
    }
}
