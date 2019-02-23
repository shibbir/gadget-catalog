import ItemTypes from '../../item/item.types';
import CategoryTypes from '../../category/category.types';

const initialState = {
    categories: [],
    itemsPerYear: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryTypes.GET_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload.data
            };
        }
        case ItemTypes.GET_ITEMS_BY_YEAR_FULFILLED: {
            return {
                ...state,
                itemsPerYear: action.payload.data
            };
        }
    }
    return state;
}
