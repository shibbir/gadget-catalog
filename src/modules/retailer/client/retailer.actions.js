import axios from "axios";
import Types from "./retailer.types";

export function getRetailers() {
    return {
        type: Types.GET_RETAILERS,
        payload: axios({
            method: "get",
            url: "/api/retailers"
        })
    };
}

export function createRetailer(formData) {
    return {
        type: Types.POST_RETAILER,
        payload: axios({
            method: "post",
            data: formData,
            url: "/api/retailers"
        })
    };
}

export function updateRetailer(formData, id) {
    return {
        type: Types.PUT_RETAILER,
        payload: axios({
            method: "put",
            data: formData,
            url: `/api/retailers/${id}`
        })
    };
}

export function getRetailer(id) {
    return {
        type: Types.GET_RETAILER,
        payload: axios({
            method: "get",
            url: `/api/retailers/${id}`
        })
    };
}
