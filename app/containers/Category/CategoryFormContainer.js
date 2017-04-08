import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import CategoryConstants from '../../constants/CategoryConstants';
import CategoryForm from '../../components/Category/CategoryForm';
import { createCategory, updateCategory, fetchCategory, resetCategoryState } from '../../actions/CategoryActions';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authReducer.user,
        categoryId: ownProps.id,
        form: `${ownProps.form}CategoryForm`,
        submitButtonText: ownProps.submitButtonText || 'Submit'
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCategory: (formData) => {
            dispatch(createCategory(formData));
        },
        updateCategory: (formData, itemId) => {
            dispatch(updateCategory(formData, itemId));
        },
        fetchCategory: (itemId) => {
            dispatch(fetchCategory(itemId));
        },
        resetCategoryState: () => {
            dispatch(resetCategoryState());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
