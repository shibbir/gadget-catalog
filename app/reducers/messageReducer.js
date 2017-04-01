const initialState = {
    id: '',
    type: '',
    message: ''
}

export default function reducer(state=initialState, action) {
    const { error, payload, type } = action;

    if(error && payload) {
        return { ...payload.response.data, id: Date.now() };
    }

    if(type.indexOf('_PENDING') !== -1) {
        if(document.getElementById('loader')) {
            document.getElementById('loader').style = 'display: block';
        }

        document.getElementById('app').style = 'opacity: 0.1';
        document.body.style = 'overflow-y: hidden';
    }

    if(type.indexOf('_FULFILLED') !== -1) {
        if(document.getElementById('loader')) {
            document.getElementById('loader').style = 'display: none';
            document.getElementById('app').style = '';
            document.body.style = '';
        }
    }

    return state;
}
