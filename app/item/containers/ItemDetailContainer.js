import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Types from '../item.types';
import { fetchItem, deleteItem, setAsActiveImage, deleteImage } from '../item.actions';
import ItemDetail from '../components/ItemDetail';

const mapStateToProps = (state, props) => {
    return {
        user: state.authReducer.user,
        item: state.itemReducer.item,
        itemId: props.match.params.id
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchItem: (itemId) => {
            dispatch(fetchItem(itemId));
        },
        deleteItem: (itemId) => {
            if(confirm('Are you sure? All images associated with this item will be removed too.')) {
                dispatch(deleteItem(itemId)).then(function(result) {
                    const { type } = result.action;

                    if(type === Types.DELETE_ITEM_FULFILLED) {
                        props.history.push('/items/');
                    }
                });
            }
        },
        setAsActiveImage: (itemId, fileId) => {
            dispatch(setAsActiveImage(itemId, fileId));
        },
        deleteImage: (itemId, fileId) => {
            if(confirm('Are you sure you want to delete this image?')) {
                dispatch(deleteImage(itemId, fileId));
            }
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));
