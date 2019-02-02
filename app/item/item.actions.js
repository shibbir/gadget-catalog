import axios from 'axios';
import ItemConstants from './item.types';

export function createItem(formData) {
    return {
        type: ItemConstants.POST_ITEM,
        payload: axios({
            method: 'put',
            data: formData,
            url: '/api/items'
        })
    };
}

export function updateItem(formData, id) {
    return {
        type: ItemConstants.PUT_ITEM,
        payload: axios({
            method: 'put',
            data: formData,
            url: `api/items/${id}`
        })
    };
}

export function fetchItem(id) {
    return {
        type: ItemConstants.GET_ITEM,
        payload: axios({
            method: 'get',
            url: `/api/items/${id}`
        })
    };
}

export function fetchItems(query = '') {
    return {
        type: ItemConstants.GET_ITEMS,
        payload: axios({
            method: 'get',
            url: `/api/items${query}`
        })
    };
}

export function resetItemState() {
    return {
        type: ItemConstants.RESET_ITEM_STATE
    };
}

export function setAsActiveImage(itemId, fileId) {
    return {
        type: ItemConstants.UPDATE_ITEM_IMAGE,
        payload: axios({
            method: 'put',
            url: `/api/items/${itemId}/images/${fileId}`
        })
    };
}

export function deleteImage(itemId, fileId) {
    return {
        type: ItemConstants.DELETE_ITEM_IMAGE,
        payload: axios({
            method: 'delete',
            url: `/api/items/${itemId}/images/${fileId}`
        })
    };
}

export function fetchItemCountsByYearRange(yearRange) {
    return {
        type: ItemConstants.GET_ITEM_COUNTS_BY_YEAR,
        payload: axios({
            method: 'get',
            url: `/api/items/yearRange/${yearRange}`
        })
    };
}
