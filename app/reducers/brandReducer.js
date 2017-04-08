import BrandConstants from '../constants/BrandConstants';

const initialState = {
    brands: [],
    activeBrand: { brand: null }
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case BrandConstants.GET_BRANDS_FULFILLED: {
            return {
                ...state,
                brands: action.payload.data
            };
        }
        case BrandConstants.GET_BRAND_FULFILLED: {
            return { ...state, activeBrand: { brand: action.payload.data }};
        }
        case BrandConstants.RESET_BRAND_STATE: {
            return { ...state, activeBrand: { brand: null }};
        }
    }
    return state;
}
