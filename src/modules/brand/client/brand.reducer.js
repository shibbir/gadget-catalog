import Types from "./brand.types";

const initialState = {
    brands: [],
    brand: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_BRANDS_FULFILLED: {
            return {
                ...state,
                brands: action.payload.data.data.brands
            };
        }
        case Types.GET_BRAND_FULFILLED: {
            return { ...state, brand: action.payload.data.data.brand };
        }
        case Types.POST_BRAND_FULFILLED: {
            return { ...state, brands: state.brands.concat(action.payload.data.data.createBrand) };
        }
        case Types.PUT_BRAND_FULFILLED: {
            const brands = state.brands.map(function(x) {
                if(x._id === action.payload.data.data.updateBrand._id) {
                    x.name = action.payload.data.data.updateBrand.name;
                }
                return x;
            });
            return { ...state, brands: brands };
        }
    }
    return state;
}
