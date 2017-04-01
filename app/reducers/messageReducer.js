const initialState = {
    id: '',
    type: '',
    message: ''
}

export default function reducer(state=initialState, action) {
    const { payload, type, error } = action;

    if(type.indexOf('_PENDING') !== -1) {
        document.getElementById('loader').style = 'display: block';
    }

    if(type.indexOf('_FULFILLED') !== -1 || type.indexOf('_REJECTED') !== -1) {
        document.getElementById('loader').style = 'display: none';
    }

    if(error && payload) {
        return { ...payload.response.data, id: Date.now() };
    }

    if(payload && payload.data) {
        return { ...payload.data, id: Date.now() };
    }

    return state;
}
