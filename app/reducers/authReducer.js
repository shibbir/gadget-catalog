import AuthConstants from '../constants/AuthConstants';

const initialState = {
    user: null,
    isLoggedIn: false
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case AuthConstants.ME_FROM_TOKEN_FULFILLED:
        case AuthConstants.LOGIN_FULFILLED: {
            localStorage.setItem('jwtToken', action.payload.jwtToken);
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        }
        case AuthConstants.LOGIN_REJECTED: {
            return state;
        }
        case AuthConstants.LOGOUT: {
            localStorage.removeItem('jwtToken');
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        }
    }
    return state;
}
