import dispatcher from '../dispatcher';
import CategoryConstants from '../constants/CategoryConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getCategories() {
    dispatcher.dispatch({ type: CategoryConstants.FETCH_CATEGORIES });

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
                type: CategoryConstants.RECEIVE_CATEGORIES,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: CategoryConstants.FETCH_CATEGORIES_ERROR });
    });
}
