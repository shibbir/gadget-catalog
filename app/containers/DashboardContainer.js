import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import { getCategories } from '../actions/CategoryActions';

const mapStateToProps = (state) => {
    return {
        categoryPieChartData: state.dashboardReducer.categoryPieChartData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
