import BrandConstants from '../constants/BrandConstants';

const initialState = {
    brands: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case BrandConstants.FETCH_BRANDS_FULFILLED: {
            return {
                ...state,
                brands: action.payload.data
            };
        }
        case BrandConstants.FETCH_BRANDS_REJECTED: {
            return state;
        }
    }
    return state;
}
