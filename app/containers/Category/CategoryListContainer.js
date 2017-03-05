import React from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../actions/CategoryActions';
import CategoryList from '../../components/Category/CategoryList';

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories
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
