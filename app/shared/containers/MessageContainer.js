import { connect } from 'react-redux';
import MessageComponent from '../components/Message';

const mapStateToProps = (state) => {
    return {
        id: state.messageReducer.id,
        type: state.messageReducer.type,
        message: state.messageReducer.message
    };
};

export default connect(mapStateToProps)(MessageComponent);
