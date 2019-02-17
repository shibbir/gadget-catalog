import React from 'react'
import { connect } from 'react-redux';
import * as toastr from 'toastr/toastr';

toastr.options = {
    timeOut: 1000,
    preventDuplicates: true,
    positionClass: 'toast-top-right'
};

function Notification({ type, message }) {
    if(type && message) {
        toastr[type](message);
    }
    return <div/>;
}

const mapStateToProps = (state) => {
    return {
        id: state.notificationReducer.id,
        type: state.notificationReducer.type,
        message: state.notificationReducer.message
    };
};

export default connect(mapStateToProps)(Notification);
