import React from 'react'
import { connect } from 'react-redux';
import * as toastr from 'toastr/toastr';

function Message({ type, message }) {
    if(type && message) {
        toastr[type](message);
    }
    return <div/>;
}

const mapStateToProps = (state) => {
    return {
        id: state.messageReducer.id,
        type: state.messageReducer.type,
        message: state.messageReducer.message
    };
};

export default connect(mapStateToProps)(Message);
