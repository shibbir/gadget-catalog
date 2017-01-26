import dispatcher from '../dispatcher';
import BrandConstants from '../constants/BrandConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getBrands() {
    dispatcher.dispatch({ type: BrandConstants.FETCH_BRANDS });

    fetch('/api/brands', {
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
                type: BrandConstants.RECEIVE_BRANDS,
                payload
            });
        });
    }).catch(function(error) {
        dispatcher.dispatch({ type: BrandConstants.FETCH_BRANDS_ERROR });
    });
}
