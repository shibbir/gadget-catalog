import Types from "./user.types";

const initialState = {
    user: null,
    isLoggedIn: false
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.LOGIN_FULFILLED:
        case Types.REGISTER_FULFILLED:
        case Types.GET_PROFILE_FULFILLED: {
            return {
                ...state,
                user: action.payload.data,
                isLoggedIn: true
            };
        }
        case Types.DISCONNECT_PROVIDER_FULFILLED: {
            return {
                ...state,
                user: action.payload.data
            };
        }
    }
    return state;
}
