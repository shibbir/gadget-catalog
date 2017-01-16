import dispatcher from '../dispatcher';

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
    .then(function(data) {
        dispatcher.dispatch({
            type: 'LOGIN',
            data
        });
    }).catch(function(error) {
        dispatcher.dispatch({
            type: 'ERROR_LOGIN',
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
                type: 'LOGIN',
                data: payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({
            type: 'ERROR_REGISTER',
            error
        });
    });
}

export function logout() {
    dispatcher.dispatch({
        type: 'LOGOUT'
    });
}
