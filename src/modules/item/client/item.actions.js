import axios from "axios";
import Types from "./item.types";

export function createItem(formData) {
    return {
        type: Types.POST_ITEM,
        payload: axios({
            method: "post",
            data: formData,
            url: "/api/items"
        })
    };
}

export function updateItem(formData, id) {
    return {
        type: Types.PUT_ITEM,
        payload: axios({
            method: "put",
            data: formData,
            url: `/api/items/${id}`
        })
    };
}

export function fetchItem(id) {
    let payload = new Promise((resolve, reject) => {
        resolve({ data: null });
    });

    if(id) {
        payload = axios({
            method: "get",
            url: `/api/items/${id}`
        });
    }

    return {
        type: Types.GET_ITEM,
        payload
    };
}

export function deleteItem(id) {
    return {
        type: Types.DELETE_ITEM,
        payload: axios({
            method: "delete",
            url: `/api/items/${id}`
        })
    };
}

export function fetchItems(query = "") {
    return {
        type: Types.GET_ITEMS,
        payload: axios({
            method: "get",
            url: `/api/items${query}`
        })
    };
}

export function setAsActiveImage(itemId, fileId) {
    return {
        type: Types.UPDATE_ITEM_IMAGE,
        payload: axios({
            method: "put",
            url: `/api/items/${itemId}/images/${fileId}`
        })
    };
}

export function deleteImage(itemId, fileId) {
    return {
        type: Types.DELETE_ITEM_IMAGE,
        payload: axios({
            method: "delete",
            url: `/api/items/${itemId}/images/${fileId}`
        })
    };
}

export function fetchItemsByYearRange(startYear, endYear) {
    return {
        type: Types.GET_ITEMS_BY_YEAR,
        payload: axios({
            method: "get",
            url: `/api/items/item-count?startYear=${startYear}&endYear=${endYear}`
        })
    };
}
