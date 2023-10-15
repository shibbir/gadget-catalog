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

export function getItem(id) {
    return {
        type: Types.GET_ITEM,
        payload: axios({
            method: "get",
            url: `/api/items/${id}`
        })
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

export function getItems(query = "") {
    return {
        type: Types.GET_ITEMS,
        payload: axios({
            method: "get",
            url: `/api/items${query}`
        })
    };
}

export function setAsActiveImage(itemId, assetId) {
    return {
        type: Types.UPDATE_ITEM_IMAGE,
        payload: axios({
            method: "put",
            url: `/api/items/${itemId}/images/${assetId}`
        })
    };
}

export function deleteImage(itemId, assetId) {
    return {
        type: Types.DELETE_ITEM_IMAGE,
        payload: axios({
            method: "delete",
            url: `/api/items/${itemId}/images/${assetId}`
        })
    };
}

export function fetchItemsByYearRange(startYear, endYear) {
    return {
        type: Types.GET_ITEMS_BY_YEAR,
        payload: axios({
            method: "get",
            url: `/api/items/item-count?start_year=${startYear}&end_year=${endYear}`
        })
    };
}
