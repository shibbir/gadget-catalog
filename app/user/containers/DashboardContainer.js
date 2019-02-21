import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getCategories } from '../../category/category.actions';
import { fetchItemsByYearRange } from '../../item/item.actions';

const mapStateToProps = (state) => {
    return {
        categories: state.dashboardReducer.categories,
        itemsPerYear: state.dashboardReducer.itemsPerYear
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        },
        fetchItemsByYearRange: (yearRange) => {
            dispatch(fetchItemsByYearRange(yearRange));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
