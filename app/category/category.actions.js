import axios from 'axios';
import { getBearerRequestObject } from '../config/helpers';
import CategoryConstants from './category.types';

export function getCategories() {
    // const config = {
    //     url: '/api/categories',
    //     method: 'get'
    // };

    return {
        type: CategoryConstants.GET_CATEGORIES,
        payload: axios({
            method: 'get',
            url: '/api/categories'
        })
    };
}

export function createCategory(formData) {
    const config = {
        url: 'api/categories',
        data: formData
    };

    return {
        type: CategoryConstants.POST_CATEGORY,
        payload: axios(getBearerRequestObject(config))
    };
}

export function updateCategory(formData, id) {
    const config = {
        url: `api/categories/${id}`,
        method: 'put',
        data: formData
    };

    return {
        type: CategoryConstants.PUT_CATEGORY,
        payload: axios(getBearerRequestObject(config))
    };
}

export function fetchCategory(id) {
    const config = {
        url: `/api/categories/${id}`,
        method: 'get'
    };

    return {
        type: CategoryConstants.GET_CATEGORY,
        payload: axios(getBearerRequestObject(config))
    };
}

export function resetCategoryState() {
    return {
        type: CategoryConstants.RESET_CATEGORY_STATE
    };
}
