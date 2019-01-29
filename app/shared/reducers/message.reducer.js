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
        const { status, data } = payload.response;
        let message = data.message;

        if(!message) {
            switch(status) {
                case 401: {
                    message = 'Unauthorized request.';
                    break;
                }
                case 500: {
                    message = 'Server responded with an error.';
                    break;
                }
                default: {
                    message = 'Invalid request.';
                    break;
                }
            }
        }

        return { id: Date.now(), type: 'error', message };
    }

    if(payload && payload.data) {
        return { ...payload.data, type: 'success', id: Date.now() };
    }

    return state;
}
