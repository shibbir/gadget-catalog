import { connect } from 'react-redux';
import App from '../components/App/App';
import { meFromApplicationToken, meFromExternalToken } from '../../user/auth.actions';

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        isLoggedIn: state.authReducer.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMeFromApplicationToken: () => {
            dispatch(meFromApplicationToken());
        },
        loadMeFromExternalApplicationToken: (provider, token) => {
            if(provider && token) {
                dispatch(meFromExternalToken(provider, token));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
