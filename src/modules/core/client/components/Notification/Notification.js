import React from "react"
import { connect } from "react-redux";
import * as iziToast from "izitoast/dist/js/izitoast";

function Notification({ type, message }) {
    if(type && message) {
        iziToast[type]({
            timeout: 3000,
            message: message,
            position: "bottomRight"
        });
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
