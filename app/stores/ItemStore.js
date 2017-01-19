import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class ItemStore extends EventEmitter {
    constructor() {
        super();
        this.item = {};
    }

    receiveItem(data) {
        this.item = data;
        this.emit('receiveItem');
    }

    getReceivedItem() {
        return this.item;
    }

    handleActions(action) {
        switch (action.type) {
            case 'RECEIVE_ITEM': {
                this.receiveItem(action.data);
                break;
            }
        }
    }
}

const itemStore = new ItemStore;
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;
