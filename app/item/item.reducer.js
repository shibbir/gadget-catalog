import moment from "moment";
import Types from "./item.types";

const initialState = {
    item: null,
    itemsPerYear: [],
    items: { data: [], pagination: { pages: [] }}
};

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case Types.GET_ITEM_PENDING: {
            return { ...state };
        }
        case Types.GET_ITEM_FULFILLED: {
            action.payload.data.purchaseDate = moment(action.payload.data.purchaseDate).format("Y-MM-DD");
            return { ...state, item: action.payload.data };
        }
        case Types.GET_ITEMS_FULFILLED: {
            return { ...state, items: { data: action.payload.data.data, pagination: action.payload.data.pagination }};
        }
        case Types.UPDATE_ITEM_IMAGE_FULFILLED:
        case Types.DELETE_ITEM_IMAGE_FULFILLED: {
            return { ...state, item: { ...state.item, files: action.payload.data.files }};
        }
        case Types.GET_ITEMS_BY_YEAR_FULFILLED: {
            return {
                ...state,
                itemsPerYear: action.payload.data
            };
        }
    }
    return state;
}
