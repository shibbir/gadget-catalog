import axios from 'axios';
import BrandConstants from '../constants/BrandConstants';
import { getBearerRequestObject } from '../config/helpers';

export function getBrands(query = '') {
    const config = {
        url: `/api/brands${query}`,
        method: 'get'
    };

    return {
        type: BrandConstants.GET_BRANDS,
        payload: axios(getBearerRequestObject(config))
    };
}

export function createBrand(formData) {
    const config = {
        url: 'api/brands',
        data: formData
    };

    return {
        type: BrandConstants.POST_BRAND,
        payload: axios(getBearerRequestObject(config))
    };
}

export function updateBrand(formData, id) {
    const config = {
        url: `api/brands/${id}`,
        method: 'put',
        data: formData
    };

    return {
        type: BrandConstants.PUT_BRAND,
        payload: axios(getBearerRequestObject(config))
    };
}

export function fetchBrand(id) {
    const config = {
        url: `/api/brands/${id}`,
        method: 'get'
    };

    return {
        type: BrandConstants.GET_BRAND,
        payload: axios(getBearerRequestObject(config))
    };
}

export function resetBrandState() {
    return {
        type: BrandConstants.RESET_BRAND_STATE
    };
}
