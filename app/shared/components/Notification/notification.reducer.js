const initialState = {
    id: "",
    type: "",
    message: ""
}

export default function reducer(state=initialState, action) {
    const { payload, error } = action;

    if(error && payload) {
        const { status } = payload.response;
        let message = "";

        switch(status) {
            case 401: {
                message = "You don't have the permission to perform this action.";
                break;
            }
            case 500: {
                message = "An error occurred! Please try again.";
                break;
            }
            default: {
                message = "Something's wrong! Please try again.";
                break;
            }
        }

        return { id: Date.now(), type: "error", message };
    }

    if(payload && payload.config.method !== "get" && payload.data) {
        return {
            id: Date.now(),
            type: "success",
            message: "Operation successful."
        };
    }

    return state;
}
