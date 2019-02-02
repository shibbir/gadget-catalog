import axios from 'axios';
import AuthConstants from './auth.types';

export function loadProfile() {
    return {
        type: AuthConstants.LOAD_PROFILE,
        payload: axios({
            url: 'api/profile',
            method: 'get'
        })
    };
}

export function login(formData) {
    return {
        type: AuthConstants.LOGIN,
        payload: axios({
            method: 'post',
            url: 'api/login',
            data: formData
        })
    };
}

export function register(formData) {
    return {
        type: AuthConstants.REGISTER,
        payload: axios({
            method: 'get',
            url: 'api/register',
            data: formData
        })
    };
}

export function changePassword(formData) {
    return {
        type: AuthConstants.CHANGE_PASSWORD,
        payload: axios({
            method: 'put',
            data: formData,
            url: '/api/profile/password'
        })
    };
}
