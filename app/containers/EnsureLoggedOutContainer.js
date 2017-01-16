import React from 'react';
import { browserHistory } from 'react-router';

import AuthStore from '../stores/AuthStore';

export default class EnsureLoggedOutContainer extends React.Component {
    constructor() {
        super();

        this.returnTo = '';
    }

    returnToPath() {
        browserHistory.push(this.returnTo);
    }

    componentWillMount() {
        AuthStore.on('loggedIn', this.returnToPath.bind(this));
    }

    componentWillUnmount() {
        AuthStore.removeListener('loggedIn', this.returnToPath.bind(this));
    }

    componentDidMount() {
        this.returnTo = this.props.location.query.return_to || 'dashboard';

        if (AuthStore.isLoggedIn()) {
            browserHistory.replace(this.returnTo);
        }
    }

    render() {
        if (!AuthStore.isLoggedIn()) {
            return this.props.children;
        }
        return null;
    }
}
