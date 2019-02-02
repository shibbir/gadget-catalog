import { connect } from 'react-redux';
import App from '../components/App/App';
import { loadProfile } from '../../user/auth.actions';

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        isLoggedIn: state.authReducer.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProfile: () => dispatch(loadProfile())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
