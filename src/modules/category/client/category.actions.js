import axios from "axios";
import Types from "./category.types";

export function getCategories() {
    return {
        type: Types.GET_CATEGORIES,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    query {
                        categories {
                            _id
                            name
                            file {
                                secure_url
                            }
                            items {
                                _id
                                categoryId
                            }
                        }
                    }
                `
            }
        })
    };
}

export function saveCategory(values) {
    let data = null;
    let type = null;
    let query = null;

    if(values._id) {
        type = Types.UPDATE_CATEGORY;
        query = `
            mutation($category: CategoryInput!) {
                updateCategory(category: $category) {
                    _id name createdBy
                }
            }
        `;
    } else {
        type = Types.CREATE_CATEGORY;
        query = `
            mutation($category: CategoryInput!) {
                createCategory(category: $category) {
                    _id name createdBy
                }
            }
        `;
    }

    if(values.file) {
        const formData = new FormData();

        formData.append("operations", JSON.stringify({ query, variables: { category: {...values, file: null} } }));
        formData.append("map", JSON.stringify({ "0": ["variables.category.file"] }));
        formData.append("0", values.file);

        data = formData;
    } else {
        delete values.file;

        data = {
            query,
            variables: { category: values }
        };
    }

    return {
        type,
        payload: axios({
            method: "post",
            url: "/graphql",
            data
        })
    };
}

export function getCategory(_id) {
    return {
        type: Types.GET_CATEGORY,
        payload: axios({
            method: "post",
            url: "/graphql",
            data: {
                query: `
                    query($_id: ID!) {
                        category(_id: $_id) {
                            _id name
                        }
                    }
                `,
                variables: { _id }
            }
        })
    };
}
