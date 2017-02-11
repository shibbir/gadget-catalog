let moment = require('moment');

import ItemConstants from '../constants/ItemConstants';

const initialState = {
    activeItem: {item: null}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case ItemConstants.GET_ITEM_PENDING: {
            return {...state, activeItem: {...state.activeItem}};
        }
        case ItemConstants.GET_ITEM_FULFILLED: {
            let state = {
                activeItem: {
                    item: action.payload
                }
            };
            state.activeItem.item.purchaseDate = moment(state.activeItem.item.purchaseDate).format('Y-MM-DD');

            return state;
        }
    }
    return state;
}
