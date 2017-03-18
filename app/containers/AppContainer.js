import { connect } from 'react-redux';

import App from '../components/App/App';
import { meFromApplicationToken, meFromExternalToken } from '../actions/AuthActions';

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        isLoggedIn: state.authReducer.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMeFromApplicationToken: () => {
            const token = localStorage.getItem('jwtToken');

            if(token) {
                dispatch(meFromApplicationToken(token));
            }
        },
        loadMeFromExternalApplicationToken: (provider, token) => {
            if(provider && token) {
                dispatch(meFromExternalToken(provider, token));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
