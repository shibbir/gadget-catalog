import { connect } from "react-redux";
import { fetchItems } from "../item.actions";
import ItemList from "../components/ItemList";
import { getBrands } from "../../brand/brand.actions";
import { getCategories } from "../../category/category.actions";

const mapStateToProps = (state, props) => {
    return {
        location: props.location,
        items: state.itemReducer.items,
        brands: state.brandReducer.brands,
        categories: state.categoryReducer.categories
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBrands: () => dispatch(getBrands()),
        getCategories: () => dispatch(getCategories()),
        fetchItems: (query) => dispatch(fetchItems(query))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
