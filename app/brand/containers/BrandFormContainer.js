import { connect } from 'react-redux';
import BrandForm from '../components/BrandForm';
import { createBrand, updateBrand, fetchBrand } from '../brand.actions';

const mapStateToProps = (state, props) => {
    return {
        brandId: props.id,
        brand: state.brandReducer.brand
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBrand: (formData) => {
            dispatch(createBrand(formData));
        },
        updateBrand: (formData, itemId) => {
            dispatch(updateBrand(formData, itemId));
        },
        fetchBrand: (itemId) => {
            dispatch(fetchBrand(itemId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandForm);
