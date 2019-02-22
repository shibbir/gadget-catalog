import { connect } from 'react-redux';
import { fetchItem, setAsActiveImage, deleteImage } from '../item.actions';
import ItemDetail from '../components/ItemDetail';

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
        },
        setAsActiveImage: (itemId, fileId) => {
            dispatch(setAsActiveImage(itemId, fileId));
        },
        deleteImage: (itemId, fileId) => {
            if(confirm('Are you sure? The image will be deleted from the cloudinary server.')) {
                dispatch(deleteImage(itemId, fileId));
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
