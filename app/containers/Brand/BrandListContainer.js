import React from 'react';
import { connect } from 'react-redux';
import { getBrands } from '../../actions/BrandActions';
import BrandList from '../../components/Brand/BrandList';

const mapStateToProps = (state) => {
    return {
        brands: state.brandReducer.brands
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBrands: (query) => {
            dispatch(getBrands(query));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandList);
