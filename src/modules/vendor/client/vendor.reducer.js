import Types from "./vendor.types";

const initialState = {
    vendors: [],
    vendor: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_VENDORS_FULFILLED: {
            return {
                ...state,
                vendors: action.payload.data
            };
        }
        case Types.POST_VENDOR_FULFILLED: {
            return { ...state, vendors: state.vendors.concat(action.payload.data) };
        }
    }
    return state;
}
