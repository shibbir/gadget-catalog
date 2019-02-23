import { connect } from 'react-redux';
import { getCategories } from '../category.actions';
import CategoryList from '../components/CategoryList';

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        user: state.authReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
