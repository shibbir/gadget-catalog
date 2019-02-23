import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBrands } from '../../brand/brand.actions';
import { getCategories } from '../../category/category.actions';
import { createItem, updateItem, fetchItem } from '../item.actions';
import Types from '../item.types';
import ItemForm from '../components/ItemForm';

const mapStateToProps = (state, props) => {
    return {
        itemId: props.id,
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories,
        item: state.itemReducer.item
    };
}

const mapDispatchToProps = (dispatch) => {
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

                if(type === Types.POST_ITEM_FULFILLED) {
                    <Redirect push to={`items/${payload.data._id}`}/>
                }
            });
        },
        updateItem: (formData, itemId) => {
            dispatch(updateItem(formData, itemId)).then(result => {
                const { type, payload } = result.action;

                if(type === Types.PUT_ITEM_FULFILLED) {
                    <Redirect push to={`/items/${payload.data._id}`}/>
                }
            });
        },
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
