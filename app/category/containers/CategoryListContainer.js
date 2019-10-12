import { connect } from "react-redux";
import { getCategories } from "../category.actions";
import CategoryList from "../components/CategoryList";

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
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
