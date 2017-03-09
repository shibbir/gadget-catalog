import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { updateCategory, fetchCategory, resetCategoryState } from '../../actions/CategoryActions';
import CategoryConstants from '../../constants/CategoryConstants';
import CategoryForm from '../../components/Category/CategoryForm';

const mapStateToProps = (state, ownProps) => {
    return {
        categoryId: ownProps.id,
        form: `${ownProps.form}CategoryForm`,
        submitButtonText: ownProps.submitButtonText || 'Submit'
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
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
