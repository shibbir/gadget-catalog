import CategoryConstants from '../constants/CategoryConstants';

const initialState = {
    categories: [],
    activeCategory: { category: null }
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload
            };
        }
        case CategoryConstants.GET_CATEGORY_FULFILLED: {
            return { ...state, activeCategory: { category: action.payload }};
        }
        case CategoryConstants.RESET_CATEGORY_STATE: {
            return { ...state, activeCategory: { category: null }};
        }
    }
    return state;
}
