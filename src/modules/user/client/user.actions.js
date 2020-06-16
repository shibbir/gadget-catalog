import axios from "axios";
import Types from "./user.types";

export function getSignedInUserProfile() {
    return {
        type: Types.GET_PROFILE,
        payload: axios({
            method: "get",
            url: "/api/profile"
        })
    };
}

export function login(formData) {
    return {
        type: Types.LOGIN,
        payload: axios({
            method: "post",
            url: "/api/login",
            data: formData
        })
    };
}

export function register(formData) {
    return {
        type: Types.REGISTER,
        payload: axios({
            method: "post",
            url: "/api/register",
            data: formData
        })
    };
}

export function changePassword(formData) {
    return {
        type: Types.CHANGE_PASSWORD,
        payload: axios({
            method: "put",
            data: formData,
            url: "/api/profile/changepassword"
        })
    };
}

export function resetPassword(formData, query) {
    return {
        type: Types.RESET_PASSWORD,
        payload: axios({
            method: "put",
            data: formData,
            url: `/api/resetpassword${query}`
        })
    };
}

export function removeOauthProvider(provider) {
    return {
        type: Types.DISCONNECT_PROVIDER,
        payload: axios({
            method: "put",
            url: `/api/oauth/disconnect?provider=${provider}`
        })
    };
}
