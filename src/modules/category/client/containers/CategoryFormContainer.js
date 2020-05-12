import { connect } from "react-redux";
import CategoryForm from "../components/CategoryForm";
import { createCategory, updateCategory, fetchCategory } from "../category.actions";

const mapStateToProps = (state, props) => {
    return {
        user: state.userReducer.loggedInUser,
        categoryId: props.id,
        category: state.categoryReducer.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createCategory: formData => dispatch(createCategory(formData)),

        updateCategory: (formData, itemId) => {
            dispatch(updateCategory(formData, itemId));
        },
        fetchCategory: itemId => {
            dispatch(fetchCategory(itemId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
