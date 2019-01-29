import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { logout } from '../../user/auth.actions';

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
