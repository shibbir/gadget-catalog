import CategoryConstants from '../constants/CategoryConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getCategories() {
    let config = {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        })
    };

    return {
        type: CategoryConstants.FETCH_CATEGORIES,
        payload: fetch('/api/categories', config)
            .then(handleErrors)
            .then(response => response.json())
    };
}
