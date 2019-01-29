import ItemConstants from '../../item/item.types';
import CategoryConstants from '../../category/category.types';

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
