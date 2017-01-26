import dispatcher from '../dispatcher';
import ItemConstants from '../constants/ItemConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function createItem(formData) {
    dispatcher.dispatch({ type: ItemConstants.POST_ITEM });

    fetch('/api/items', {
        method: 'post',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: ItemConstants.RECEIVE_CREATED_ITEM,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: ItemConstants.POST_ITEM_ERROR });
    });
}

export function updateItem(id, formData) {
    dispatcher.dispatch({ type: ItemConstants.UPDATE_ITEM });

    fetch(`/api/items/${id}`, {
        method: 'put',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        })
    })
    .then(handleErrors)
    .then(function(response) {
        response.json().then(function(payload) {
            dispatcher.dispatch({
                type: ItemConstants.RECEIVE_UPDATED_ITEM,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: ItemConstants.UPDATE_ITEM_ERROR });
    });
}

export function getItem(id) {
    dispatcher.dispatch({ type: ItemConstants.FETCH_ITEM });

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
                type: ItemConstants.RECEIVE_ITEM,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: ItemConstants.FETCH_ITEM_ERROR });
    });
}
