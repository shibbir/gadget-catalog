import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    };
};

export default withRouter(connect(mapStateToProps)(Navbar));
