import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import CategoryConstants from '../constants/CategoryConstants';

class CategoryStore extends EventEmitter {
    constructor() {
        super();
        this.categories = [];
    }

    receiveCategories(payload) {
        this.categories = payload;
        this.emit('receiveCategories');
    }

    handleActions(action) {
        switch (action.type) {
            case CategoryConstants.RECEIVE_CATEGORIES: {
                this.receiveCategories(action.payload);
                break;
            }
        }
    }
}

const categoryStore = new CategoryStore;
dispatcher.register(categoryStore.handleActions.bind(categoryStore));

export default categoryStore;
