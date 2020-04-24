import Typse from "./brand.types";

const initialState = {
    brands: [],
    brand: null
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Typse.GET_BRANDS_FULFILLED: {
            return {
                ...state,
                brands: action.payload.data
            };
        }
        case Typse.GET_BRAND_FULFILLED: {
            return { ...state, brand: action.payload.data };
        }
    }
    return state;
}
