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
        type: CategoryConstants.GET_CATEGORIES,
        payload: fetch('/api/categories', config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function createCategory(formData) {
    let config = {
        method: 'post',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        })
    };

    return {
        type: CategoryConstants.POST_CATEGORY,
        payload: fetch(`api/categories`, config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function updateCategory(formData, id) {
    let config = {
        method: 'put',
        body: formData,
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        })
    };

    return {
        type: CategoryConstants.PUT_CATEGORY,
        payload: fetch(`api/categories/${id}`, config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function fetchCategory(id) {
    let config = {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        })
    };

    return {
        type: CategoryConstants.GET_CATEGORY,
        payload: fetch(`/api/categories/${id}`, config)
            .then(handleErrors)
            .then(response => response.json())
    };
}

export function resetCategoryState() {
    return {
        type: CategoryConstants.RESET_CATEGORY_STATE
    };
}
