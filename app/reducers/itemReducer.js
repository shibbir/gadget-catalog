let moment = require('moment');

import ItemConstants from '../constants/ItemConstants';

const initialState = {
    items: { data: [], pagination: { pages: [] }},
    activeItem: { item: null }
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case ItemConstants.GET_ITEM_PENDING: {
            return { ...state, activeItem: { ...state.activeItem }};
        }
        case ItemConstants.GET_ITEM_FULFILLED: {
            action.payload.purchaseDate = moment(action.payload.purchaseDate).format('Y-MM-DD');
            return { ...state, activeItem: { item: action.payload }};
        }
        case ItemConstants.GET_ITEMS_FULFILLED: {
            return { ...state, items: { data: action.payload.data, pagination: action.payload.pagination }};
        }
        case ItemConstants.RESET_ITEM_STATE: {
            return { ...state, activeItem: { item: null }};
        }
        case ItemConstants.UPDATE_ITEM_IMAGE_FULFILLED:
        case ItemConstants.DELETE_ITEM_IMAGE_FULFILLED: {
            return { ...state, activeItem: { item: { ...state.activeItem.item, files: action.payload.files }}};
        }
    }
    return state;
}
