import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    };
};

class EnsureLoggedOutContainer extends React.Component {
    constructor(props) {
        super();
        this.returnTo = props.location.query.return_to || 'dashboard';
    }

    redirectTo() {
        hashHistory.replace(this.returnTo);
    }

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.redirectTo();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isLoggedIn) {
            this.redirectTo();
        }
    }

    render() {
        return this.props.children;
    }
}

export default connect(mapStateToProps)(EnsureLoggedOutContainer);
