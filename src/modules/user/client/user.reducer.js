import Types from "./user.types";

const initialState = {
    loggedInUser: null
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.LOGIN_FULFILLED:
        case Types.REGISTER_FULFILLED:
        case Types.GET_PROFILE_FULFILLED: {
            return {
                ...state,
                loggedInUser: action.payload.data
            };
        }
        case Types.DISCONNECT_PROVIDER_FULFILLED: {
            return {
                ...state,
                loggedInUser: action.payload.data
            };
        }
    }
    return state;
}
