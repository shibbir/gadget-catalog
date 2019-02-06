import { connect } from 'react-redux';
import { getBrands } from '../../brand/brand.actions';
import { getCategories } from '../../category/category.actions';
import { createItem, updateItem, fetchItem, resetItemState } from '../item.actions';
import ItemConstants from '../item.types';
import ItemForm from '../components/ItemForm';

const mapStateToProps = (state, props) => {
    return {
        itemId: props.id,
        form: `${props.form}ItemForm`,
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories,
        item: state.itemReducer.activeItem.item
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getBrands: () => {
            dispatch(getBrands());
        },
        getCategories: () => {
            dispatch(getCategories());
        },
        createItem: (formData) => {
            dispatch(createItem(formData)).then(result => {
                const { type, payload } = result.action;

                if(type === ItemConstants.POST_ITEM_FULFILLED) {
                    props.history.push({ pathname: `items/${payload.data._id}` });
                }
            });
        },
        updateItem: (formData, itemId) => {
            dispatch(updateItem(formData, itemId)).then(result => {
                const { type, payload } = result.action;

                if(type === ItemConstants.PUT_ITEM_FULFILLED) {
                    props.history.push({ pathname: `items/${payload.data._id}` });
                }
            });
        },
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        },
        resetItemState: () => {
            dispatch(resetItemState());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
