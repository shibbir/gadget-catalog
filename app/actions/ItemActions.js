import dispatcher from '../dispatcher';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function saveItem(data) {
    dispatcher.dispatch({ type: 'POST_ITEM' });

    fetch('/api/items', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: 'RECEIVE_ITEM',
                data: payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: 'POST_ITEM_ERROR' });
    });
}

export function getItem(id) {
    dispatcher.dispatch({ type: 'FETCH_ITEM' });

    fetch(`/api/items/${id}`, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: 'RECEIVE_ITEM',
                data: payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: 'FETCH_ITEM_ERROR' });
    });
}
