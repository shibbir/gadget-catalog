import axios from 'axios';
import BrandConstants from './brand.types';

export function getBrands(query = '') {
    return {
        type: BrandConstants.GET_BRANDS,
        payload: axios({
            method: 'get',
            url: `/api/brands${query}`
        })
    };
}

export function createBrand(formData) {
    return {
        type: BrandConstants.POST_BRAND,
        payload: axios({
            method: 'get',
            data: formData,
            url: 'api/brands'
        })
    };
}

export function updateBrand(formData, id) {
    return {
        type: BrandConstants.PUT_BRAND,
        payload: axios({
            method: 'put',
            data: formData,
            url: `api/brands/${id}`
        })
    };
}

export function fetchBrand(id) {
    return {
        type: BrandConstants.GET_BRAND,
        payload: axios({
            method: 'get',
            url: `/api/brands/${id}`
        })
    };
}

export function resetBrandState() {
    return {
        type: BrandConstants.RESET_BRAND_STATE
    };
}
