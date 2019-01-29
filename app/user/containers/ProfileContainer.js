import { connect } from 'react-redux';
import { changePassword } from '../auth.actions';
import Profile from '../components/Profile';

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (formData) => {
            dispatch(changePassword(formData));
        }
    };
};

export default connect(null, mapDispatchToProps)(Profile);
