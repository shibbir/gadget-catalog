import { connect } from 'react-redux';

import { fetchItems } from '../../actions/ItemActions';
import ItemCards from '../../components/Item/ItemCards';

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        items: state.itemReducer.items
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: () => {
            dispatch(fetchItems());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCards);
