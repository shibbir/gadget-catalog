import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class CategoryStore extends EventEmitter {
    constructor() {
        super();
        this.categories = [];
    }

    receiveCategories(data) {
        this.categories = data;
        this.emit('receiveCategories');
    }

    handleActions(action) {
        switch (action.type) {
            case 'RECEIVE_CATEGORIES': {
                this.receiveCategories(action.data);
                break;
            }
        }
    }
}

const categoryStore = new CategoryStore;
dispatcher.register(categoryStore.handleActions.bind(categoryStore));

export default categoryStore;
