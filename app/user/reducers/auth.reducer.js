import AuthConstants from '../auth.types';

const initialState = {
    user: null,
    isLoggedIn: false
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case AuthConstants.LOGIN_FULFILLED:
        case AuthConstants.REGISTER_FULFILLED:
        case AuthConstants.LOAD_PROFILE_FULFILLED: {
            return {
                ...state,
                user: action.payload.data,
                isLoggedIn: true
            };
        }
    }
    return state;
}
