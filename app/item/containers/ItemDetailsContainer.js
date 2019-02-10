import { connect } from 'react-redux';
import { fetchItem } from '../item.actions';
import ItemDetails from '../components/ItemDetails';

const mapStateToProps = (state, props) => {
    return {
        itemId: props.match.params.id,
        item: state.itemReducer.item
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
