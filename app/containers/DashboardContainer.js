import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getCategories } from '../actions/CategoryActions';
import { fetchItemCountsByYearRange } from '../actions/ItemActions';

const mapStateToProps = (state) => {
    return {
        categories: state.dashboardReducer.categories,
        itemCountsPerYear: state.dashboardReducer.itemCountsPerYear
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        },
        fetchItemCountsByYearRange: (yearRange) => {
            dispatch(fetchItemCountsByYearRange(yearRange));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
