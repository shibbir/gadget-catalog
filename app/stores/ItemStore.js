import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import ItemConstants from '../constants/ItemConstants';

class ItemStore extends EventEmitter {
    constructor() {
        super();
        this.item = {};
    }

    receiveItem(payload) {
        this.item = payload;
        this.emit('receiveItem');
    }

    receiveCreatedItem(payload) {
        this.item = payload;
        setTimeout(() => {
            this.emit('receiveCreatedItem');
        });
    }

    getReceivedItem() {
        return this.item;
    }

    handleActions(action) {
        switch (action.type) {
            case ItemConstants.RECEIVE_ITEM: {
                this.receiveItem(action.payload);
                break;
            }
            case ItemConstants.RECEIVE_CREATED_ITEM: {
                this.receiveCreatedItem(action.payload);
                break;
            }
            case ItemConstants.RECEIVE_UPDATED_ITEM: {
                this.receiveItem(action.payload);
                break;
            }
        }
    }
}

const itemStore = new ItemStore;
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;
