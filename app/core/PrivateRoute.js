import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Footer from '../shared/components/Footer';
import Navbar from '../shared/components/Navbar';
import Notification from '../shared/components/Notification/Notification';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isLoggedIn
    };
};

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                return (
                    isAuthenticated ? (
                        <>
                            <Navbar/>
                            <Container style={{flex:1}}>
                                <Component {...props}/>
                            </Container>
                            <Footer/>
                            <Notification/>
                        </>
                    ) : (
                        <Redirect push to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
                )
            }}/>
        )
    }
}

export default connect(mapStateToProps)(PrivateRoute);
