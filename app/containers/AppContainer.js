import { connect } from 'react-redux';

import App from '../components/App/App';
import { meFromToken } from '../actions/AuthActions';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMeFromToken: () => {
            let token = localStorage.getItem('jwtToken');
            if(!token) {
                return;
            }

            dispatch(meFromToken(token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
