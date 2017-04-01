const initialState = {
    id: '',
    type: '',
    message: ''
}

function resetLoaderStyle() {
    document.body.style = '';
    document.getElementById('app').style = '';
    document.getElementById('loader').style = 'display: none';
}

export default function reducer(state=initialState, action) {
    const { payload, type, error } = action;

    if(type.indexOf('_PENDING') !== -1) {
        document.body.style = 'overflow-y: hidden';
        document.getElementById('app').style = 'opacity: 0.1';
        document.getElementById('loader').style = 'display: block';
    }

    if(type.indexOf('_FULFILLED') !== -1) {
        resetLoaderStyle();
    }

    if(type.indexOf('_REJECTED') !== -1) {
        resetLoaderStyle();
    }

    if(error && payload) {
        return { ...payload.response.data, id: Date.now() };
    }

    if(payload && payload.data) {
        return { ...payload.data, id: Date.now() };
    }

    return state;
}
