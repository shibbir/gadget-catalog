import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getCategories } from '../actions/CategoryActions';
import { fetchItemCountsByYearRange } from '../item/item.actions';

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
