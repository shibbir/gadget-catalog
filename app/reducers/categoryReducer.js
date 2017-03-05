import CategoryConstants from '../constants/CategoryConstants';

const initialState = {
    categories: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryConstants.FETCH_CATEGORIES_FULFILLED: {
            return {
                ...state,
                categories: action.payload
            };
        }
    }
    return state;
}
