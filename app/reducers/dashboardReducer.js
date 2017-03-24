import ItemConstants from '../constants/ItemConstants';
import CategoryConstants from '../constants/CategoryConstants';

const initialState = {
    categories: [],
    itemCountsPerYear: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload.data
            };
        }
        case ItemConstants.GET_ITEM_COUNTS_BY_YEAR_FULFILLED: {
            return {
                ...state,
                itemCountsPerYear: action.payload.data
            };
        }
    }
    return state;
}
