import axios from 'axios';
import Types from './brand.types';

export function getBrands(query = '') {
    return {
        type: Types.GET_BRANDS,
        payload: axios({
            method: 'get',
            url: `/api/brands${query}`
        })
    };
}

export function createBrand(formData) {
    return {
        type: Types.POST_BRAND,
        payload: axios({
            method: 'post',
            data: formData,
            url: '/api/brands'
        })
    };
}

export function updateBrand(formData, id) {
    return {
        type: Types.PUT_BRAND,
        payload: axios({
            method: 'put',
            data: formData,
            url: `/api/brands/${id}`
        })
    };
}

export function fetchBrand(id) {
    return {
        type: Types.GET_BRAND,
        payload: axios({
            method: 'get',
            url: `/api/brands/${id}`
        })
    };
}

export function resetBrandState() {
    return {
        type: Types.RESET_BRAND_STATE
    };
}
