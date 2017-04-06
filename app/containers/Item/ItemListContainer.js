import { connect } from 'react-redux';
import { getBrands } from '../../actions/BrandActions';
import { getCategories } from '../../actions/CategoryActions';
import { fetchItems } from '../../actions/ItemActions';
import ItemList from '../../components/Item/ItemList';

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        items: state.itemReducer.items,
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories
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
        fetchItems: (query) => {
            dispatch(fetchItems(query));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
