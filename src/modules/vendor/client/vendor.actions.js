import axios from "axios";
import Types from "./vendor.types";

export function getVendors() {
    return {
        type: Types.GET_VENDORS,
        payload: axios({
            method: "get",
            url: "/api/vendors"
        })
    };
}

export function createVendor(formData) {
    return {
        type: Types.POST_VENDOR,
        payload: axios({
            method: "post",
            data: formData,
            url: "/api/vendors"
        })
    };
}

export function updateVendor(formData, id) {
    return {
        type: Types.PUT_VENDOR,
        payload: axios({
            method: "put",
            data: formData,
            url: `/api/vendors/${id}`
        })
    };
}

export function getVendor(id) {
    return {
        type: Types.GET_VENDOR,
        payload: axios({
            method: "get",
            url: `/api/vendors/${id}`
        })
    };
}
