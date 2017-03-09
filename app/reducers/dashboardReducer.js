import CategoryConstants from '../constants/CategoryConstants';

const initialState = {
    categoryPieChartData: []
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case CategoryConstants.GET_CATEGORIES_FULFILLED: {
            let data = [];

            for(let idx = 0; idx < action.payload.length; idx++) {
                data.push({
                    name: action.payload[idx].name,
                    y: action.payload[idx].items.length
                });
            }
            return {
                ...state,
                categoryPieChartData: data
            };
        }
    }
    return state;
}
