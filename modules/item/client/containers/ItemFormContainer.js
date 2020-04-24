import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { getBrands } from "../../../brand/client/brand.actions";
import { getCategories } from "../../../category/client/category.actions";
import { createItem, updateItem, fetchItem } from "../item.actions";

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
        getBrands: () => dispatch(getBrands()),
        getCategories: () => dispatch(getCategories()),
        createItem: formData => dispatch(createItem(formData)),
        updateItem: (formData, itemId) => dispatch(updateItem(formData, itemId)),
        fetchItem: itemId => dispatch(fetchItem(itemId))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemForm));
