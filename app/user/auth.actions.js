import axios from 'axios';
import AuthConstants from './auth.types';
import { getRequestObject, getBearerRequestObject } from '../config/helpers';

export function meFromApplicationToken() {
    const config = getBearerRequestObject({
        url: 'api/profile',
        method: 'get'
    });

    if(!config) {
        return {
            type: AuthConstants.INVALID_TOKEN
        };
    }

    return {
        type: AuthConstants.ME_FROM_TOKEN,
        payload: axios(config)
    };
}

export function meFromExternalToken(provider, token) {
    return {
        type: AuthConstants.ME_FROM_EXTERNAL_TOKEN,
        payload: axios(`/api/oauth/profile?provider=${provider}&token=${token}`)
    };
}

export function login(formData) {
    const config = {
        url: 'api/login',
        data: formData
    };

    return {
        type: AuthConstants.LOGIN,
        payload: axios(getRequestObject(config))
    };
}

export function register(formData) {
    const config = {
        url: 'api/register',
        data: formData
    };

    return {
        type: AuthConstants.REGISTER,
        payload: axios(getRequestObject(config))
    };
}

export function logout() {
    return {
        type: AuthConstants.LOGOUT
    };
}

export function changePassword(formData) {
    const config = {
        url: '/api/profile/password',
        method: 'put',
        data: formData
    };

    return {
        type: AuthConstants.CHANGE_PASSWORD,
        payload: axios(getBearerRequestObject(config))
    };
}
