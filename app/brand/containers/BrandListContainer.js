import { connect } from 'react-redux';
import { getBrands } from '../brand.actions';
import BrandList from '../components/BrandList';

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
