import dispatcher from '../dispatcher';
import AuthConstants from '../constants/AuthConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function login(data) {
    fetch('/api/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: AuthConstants.LOGIN,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({
            type: AuthConstants.LOGIN_ERROR,
            error
        });
    });
}

export function register(data) {
    fetch('/api/register', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: AuthConstants.REGISTER,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({
            type: AuthConstants.REGISTER_ERROR,
            error
        });
    });
}

export function logout() {
    dispatcher.dispatch({
        type: AuthConstants.LOGOUT
    });
}
