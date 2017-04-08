import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import BrandConstants from '../../constants/BrandConstants';
import BrandForm from '../../components/Brand/BrandForm';
import { createBrand, updateBrand, fetchBrand, resetBrandState } from '../../actions/BrandActions';

const mapStateToProps = (state, ownProps) => {
    return {
        brandId: ownProps.id,
        form: `${ownProps.form}BrandForm`,
        submitButtonText: ownProps.submitButtonText || 'Submit'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBrand: (formData) => {
            dispatch(createBrand(formData)).then(() => dispatch(resetBrandState()));
        },
        updateBrand: (formData, itemId) => {
            dispatch(updateBrand(formData, itemId));
        },
        fetchBrand: (itemId) => {
            dispatch(fetchBrand(itemId));
        },
        resetBrandState: () => {
            dispatch(resetBrandState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandForm);
