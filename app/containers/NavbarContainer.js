import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import { logout } from '../actions/AuthActions';

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    };
}

export default connect(null, mapDispatchToProps)(Navbar);
