import CategoryConstants from "./category.types";

const initialState = {
    categories: [],
    category: null
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload.data
            };
        }
        case CategoryConstants.GET_CATEGORY_FULFILLED: {
            return { ...state, category: action.payload.data };
        }
        case CategoryConstants.PUT_CATEGORY_REJECTED: {
            return state;
        }
    }
    return state;
}
