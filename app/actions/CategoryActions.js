import dispatcher from '../dispatcher';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getCategories() {
    dispatcher.dispatch({ type: 'FETCH_CATEGORIES' });

    fetch('/api/categories', {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: 'RECEIVE_CATEGORIES',
                data: payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: 'FETCH_CATEGORIES_ERROR' });
    });
}
