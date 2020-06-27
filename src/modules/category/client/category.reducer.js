import Types from "./category.types";

const initialState = {
    categories: [],
    category: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload.data.data.categories
            };
        }
        case Types.GET_CATEGORY_FULFILLED: {
            return {
                ...state,
                category: action.payload.data.data.category
            };
        }
        case Types.UPDATE_CATEGORY_REJECTED: {
            return state;
        }
    }
    return state;
}
