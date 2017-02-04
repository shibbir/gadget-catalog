import ItemConstants from '../constants/ItemConstants';

const initialState = {
    activeItem: {item: null, loading: false}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case ItemConstants.FETCH_ITEM_PENDING: {
            return {...state, activeItem: {...state.activeItem, loading: true}};
        }
        case ItemConstants.FETCH_ITEM_FULFILLED: {
            return {...state, activeItem: {item: action.payload, loading: false}};
        }
    }
    return state;
}
