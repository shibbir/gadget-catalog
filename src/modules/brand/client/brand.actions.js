import axios from "axios";
import Types from "./brand.types";

export function getBrands() {
    return {
        type: Types.GET_BRANDS,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    query {
                        brands {
                            _id name createdBy
                        }
                    }
                `
            }
        })
    };
}

export function createBrand(formData) {
    return {
        type: Types.POST_BRAND,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    mutation($brand: BrandInput!) {
                        createBrand(brand: $brand) {
                            _id name createdBy
                        }
                    }
                `,
                variables: { brand: formData }
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    };
}

export function updateBrand(formData) {
    return {
        type: Types.PUT_BRAND,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    mutation($brand: BrandInput!) {
                        updateBrand(brand: $brand) {
                            _id name createdBy
                        }
                    }
                `,
                variables: { brand: formData }
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
    };
}

export function getBrand(_id) {
    return {
        type: Types.GET_BRAND,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    query($_id: ID!) {
                        brand(_id: $_id) {
                            _id name
                        }
                    }
                `,
                variables: { _id }
            }
        })
    };
}

export function resetBrandState() {
    return {
        type: Types.RESET_BRAND_STATE
    };
}
