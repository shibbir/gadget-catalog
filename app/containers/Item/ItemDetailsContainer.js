import { connect } from 'react-redux';

import { fetchItem } from '../../actions/ItemActions';
import ItemDetails from '../../components/Item/ItemDetails';

const mapStateToProps = (state, ownProps) => {
    return {
        itemId: ownProps.id,
        activeItem: state.itemReducer.activeItem
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
