import { connect } from 'react-redux';
import { changePassword } from '../actions/AuthActions';
import Profile from '../components/Account/Profile';

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (formData) => {
            dispatch(changePassword(formData));
        }
    };
};

export default connect(null, mapDispatchToProps)(Profile);
