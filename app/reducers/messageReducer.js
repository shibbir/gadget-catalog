const initialState = {
    id: '',
    type: '',
    message: ''
}

export default function messageReducer (state=initialState, action) {
    const { error, payload, type } = action;

    if(error && payload) {
        return { ...payload.response.data, id: Date.now() };
    }

    return state;
}
