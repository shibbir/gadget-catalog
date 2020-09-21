import Types from "./retailer.types";

const initialState = {
    retailers: [],
    retailer: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_RETAILERS_FULFILLED: {
            return {
                ...state,
                retailers: action.payload.data
            };
        }
        case Types.POST_RETAILER_FULFILLED: {
            return { ...state, retailers: state.retailers.concat(action.payload.data) };
        }
    }
    return state;
}
