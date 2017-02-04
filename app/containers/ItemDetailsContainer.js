import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { fetchItem } from '../actions/ItemActions';
import ItemDetails from '../components/Item/ItemDetails';

const mapStateToProps = (state, ownProps) => {
    return {
        activeItem: state.itemReducer.activeItem,
        itemId: ownProps.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
