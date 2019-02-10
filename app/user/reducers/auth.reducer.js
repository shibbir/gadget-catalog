import Types from '../auth.types';

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
    }
    return state;
}
