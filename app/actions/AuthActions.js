import AuthConstants from '../constants/AuthConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function meFromToken(token) {
    let config = {
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

export function login(data) {
    let config = {
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

// export function register(data) {
//     fetch('/api/register', {
//         method: 'post',
//         body: JSON.stringify(data),
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         })
//     })
//     .then(handleErrors)
//     .then(function(response) {
//         response.json().then(function(payload) {
//             dispatcher.dispatch({
//                 type: AuthConstants.REGISTER,
//                 payload
//             });
//         });
//     }).catch(function(error) {
//         dispatcher.dispatch({
//             type: AuthConstants.REGISTER_ERROR,
//             error
//         });
//     });
// }
//

export function logout() {
    return {
        type: AuthConstants.LOGOUT
    };
}
