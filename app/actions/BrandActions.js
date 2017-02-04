import BrandConstants from '../constants/BrandConstants';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getBrands() {
    let config = {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        })
    };

    return {
        type: BrandConstants.FETCH_BRANDS,
        payload: fetch('/api/brands', config)
            .then(handleErrors)
            .then(response => response.json())
    };
}
