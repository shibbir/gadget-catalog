import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Footer from '../Shared/components/Footer';
import NavbarContainer from '../Shared/containers/NavbarContainer';

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
                            <NavbarContainer />
                            <Container>
                                <Component {...props} />
                            </Container>
                            <Footer />
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
