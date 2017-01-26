import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import BrandConstants from '../constants/BrandConstants';

class BrandStore extends EventEmitter {
    constructor() {
        super();
        this.brands = [];
    }

    receiveBrands(payload) {
        this.brands = payload;
        this.emit('receiveBrands');
    }

    handleActions(action) {
        switch (action.type) {
            case BrandConstants.RECEIVE_BRANDS: {
                this.receiveBrands(action.payload);
                break;
            }
        }
    }
}

const brandStore = new BrandStore;
dispatcher.register(brandStore.handleActions.bind(brandStore));

export default brandStore;
