import { connect } from 'react-redux';
import { getBrands } from '../../brand/brand.actions';
import { getCategories } from '../../category/category.actions';
import { fetchItems } from '../item.actions';
import ItemList from '../components/ItemList';

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
