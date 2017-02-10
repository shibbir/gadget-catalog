import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { getBrands } from '../actions/BrandActions';
import { getCategories } from '../actions/CategoryActions';
import { createItem, fetchItem } from '../actions/ItemActions';
import ItemConstants from '../constants/ItemConstants';
import ItemForm from '../components/Item/ItemForm';

const mapStateToProps = (state, ownProps) => {
    return {
        itemId: ownProps.id,
        submitButtonText: ownProps.submitButtonText || 'Submit',
        activeItem: state.itemReducer.activeItem,
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBrands: () => {
            dispatch(getBrands());
        },
        getCategories: () => {
            dispatch(getCategories());
        },
        handleSubmission: formData => {
            dispatch(createItem(formData)).then(result => {
                const { type, payload } = result.action;

                if(type === ItemConstants.POST_ITEM_FULFILLED) {
                    hashHistory.push({ pathname: `items/${payload._id}` });
                }
            });
        },
        fetchItem: itemId => {
            dispatch(fetchItem(itemId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
