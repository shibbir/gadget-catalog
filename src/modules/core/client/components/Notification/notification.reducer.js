const initialState = {
    id: "",
    type: "",
    message: ""
};

export default function reducer(state=initialState, action) {
    const { payload, error } = action;

    if(error && payload && payload.config.method !== "get") {
        return {
            id: Date.now(),
            type: "error",
            message: payload.response.data
        };
    } else if(payload && payload.data && payload.config.method !== "get") {
        return {
            id: Date.now(),
            type: "success",
            message: "Operation successful."
        };
    }

    return state;
}
