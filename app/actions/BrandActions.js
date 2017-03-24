import axios from 'axios';
import BrandConstants from '../constants/BrandConstants';
import { getBearerRequestObject } from '../config/helpers';

export function getBrands() {
    const config = {
        url: '/api/brands',
        method: 'get'
    };

    return {
        type: BrandConstants.FETCH_BRANDS,
        payload: axios(getBearerRequestObject(config))
    };
}
