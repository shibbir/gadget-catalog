import axios from 'axios';
import { getBearerRequestObject } from '../config/helpers';
import ItemConstants from './item.types';

export function createItem(formData) {
    const config = {
        url: '/api/items',
        data: formData
    };

    return {
        type: ItemConstants.POST_ITEM,
        payload: axios(getBearerRequestObject(config))
    };
}

export function updateItem(formData, id) {
    const config = {
        url: `api/items/${id}`,
        method: 'put',
        data: formData
    };

    return {
        type: ItemConstants.PUT_ITEM,
        payload: axios(getBearerRequestObject(config))
    };
}

export function fetchItem(id) {
    const config = {
        url: `/api/items/${id}`,
        method: 'get'
    };

    return {
        type: ItemConstants.GET_ITEM,
        payload: axios(getBearerRequestObject(config))
    };
}

export function fetchItems(query = '') {
    const config = {
        url: `/api/items${query}`,
        method: 'get'
    };

    return {
        type: ItemConstants.GET_ITEMS,
        payload: axios(getBearerRequestObject(config))
    };
}

export function resetItemState() {
    return {
        type: ItemConstants.RESET_ITEM_STATE
    };
}

export function setAsActiveImage(itemId, fileId) {
    const config = {
        url: `/api/items/${itemId}/images/${fileId}`,
        method: 'put'
    };

    return {
        type: ItemConstants.UPDATE_ITEM_IMAGE,
        payload: axios(getBearerRequestObject(config))
    };
}

export function deleteImage(itemId, fileId) {
    const config = {
        url: `/api/items/${itemId}/images/${fileId}`,
        method: 'delete'
    };

    return {
        type: ItemConstants.DELETE_ITEM_IMAGE,
        payload: axios(getBearerRequestObject(config))
    };
}

export function fetchItemCountsByYearRange(yearRange) {
    const config = {
        url: `/api/items/yearRange/${yearRange}`,
        method: 'get'
    };

    return {
        type: ItemConstants.GET_ITEM_COUNTS_BY_YEAR,
        payload: axios(getBearerRequestObject(config))
    };
}
