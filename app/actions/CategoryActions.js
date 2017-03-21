import axios from 'axios';
import { getAxiosRequestObject } from '../config/helpers';
import CategoryConstants from '../constants/CategoryConstants';

export function getCategories() {
    const config = {
        url: '/api/categories'
    };

    return {
        type: CategoryConstants.GET_CATEGORIES,
        payload: axios(getAxiosRequestObject(config))
    };
}

export function createCategory(formData) {
    const config = {
        url: 'api/categories',
        method: 'post',
        data: formData
    };

    return {
        type: CategoryConstants.POST_CATEGORY,
        payload: axios(getAxiosRequestObject(config))
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
        payload: axios(getAxiosRequestObject(config))
    };
}

export function fetchCategory(id) {
    const config = {
        url: `/api/categories/${id}`
    };

    return {
        type: CategoryConstants.GET_CATEGORY,
        payload: axios(getAxiosRequestObject(config))
    };
}

export function resetCategoryState() {
    return {
        type: CategoryConstants.RESET_CATEGORY_STATE
    };
}
