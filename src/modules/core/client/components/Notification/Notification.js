import React from "react"
import { useSelector } from "react-redux";
import * as iziToast from "izitoast/dist/js/izitoast";

export default function Notification() {
    const type = useSelector(state => state.notificationReducer.type);
    const message = useSelector(state => state.notificationReducer.message);

    if(type && message) {
        iziToast[type]({
            timeout: 3000,
            message: message,
            position: "bottomRight"
        });
    }

    return <></>;
}
