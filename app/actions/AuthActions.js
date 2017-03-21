import axios from 'axios';
import AuthConstants from '../constants/AuthConstants';
import { getAxiosRequestObject } from '../config/helpers';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function meFromApplicationToken(token) {
    const config = {
        method: 'get',
        headers: new Headers({
            Authorization: `Bearer ${token}`
        })
    };

    return {
        type: AuthConstants.ME_FROM_TOKEN,
        payload: fetch('/api/profile', config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function meFromExternalToken(provider, token) {
    const config = {
        method: 'get'
    };

    const query = `provider=${provider}&token=${token}`;

    return {
        type: AuthConstants.ME_FROM_EXTERNAL_TOKEN,
        payload: fetch(`/api/oauth/profile?${query}`, config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function login(data) {
    const config = {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    return {
        type: AuthConstants.LOGIN,
        payload: fetch('/api/login', config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function register(data) {
    const config = {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    return {
        type: AuthConstants.REGISTER,
        payload: fetch('/api/register', config)
            .then(handleErrors)
            .then(response => response.json())
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
        payload: axios(getAxiosRequestObject(config))
    };
}
