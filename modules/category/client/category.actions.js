import axios from "axios";
import Types from "./category.types";

export function getCategories() {
    return {
        type: Types.GET_CATEGORIES,
        payload: axios({
            method: "get",
            url: "/api/categories"
        })
    };
}

export function createCategory(formData) {
    return {
        type: Types.POST_CATEGORY,
        payload: axios({
            method: "post",
            data: formData,
            url: "/api/categories"
        })
    };
}

export function updateCategory(formData, id) {
    return {
        type: Types.PUT_CATEGORY,
        payload: axios({
            method: "put",
            data: formData,
            url: `/api/categories/${id}`
        })
    };
}

export function fetchCategory(id) {
    return {
        type: Types.GET_CATEGORY,
        payload: axios({
            method: "get",
            url: `/api/categories/${id}`
        })
    };
}
