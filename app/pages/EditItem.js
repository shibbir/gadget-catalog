import React from 'react';
let moment = require('moment');

import ItemInputFields from '../components/Item/ItemInputFields';
import ItemStore from '../stores/ItemStore';
import * as ItemActions from '../actions/ItemActions';

export default class EditItem extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            description: '',
            category: '',
            brand: '',
            purchaseDate: '',
            price: '',
            file: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
    }

    componentDidMount() {
        ItemActions.getItem(this.props.params.id);
    }

    componentWillMount() {
        ItemStore.on('receiveItem', () => {
            let item = ItemStore.getReceivedItem();

            this.setState({ id: item._id });
            this.setState({ name: item.name });
            this.setState({ description: item.description });
            this.setState({ category: item.category });
            this.setState({ brand: item.brand });
            this.setState({ purchaseDate: moment(item.purchaseDate).format('Y-MM-DD') });
            this.setState({ price: item.price });
        });
    }

    componentWillUnmount() {
        ItemStore.removeListener('receiveItem', () => {
            let item = ItemStore.getReceivedItem();
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;

        this.setState({
            [name]: value
        });
    }

    handleUpdateItem(event) {
        event.preventDefault();

        var formData  = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('category', this.state.category);
        formData.append('brand', this.state.brand);
        formData.append('purchaseDate', moment(this.state.purchaseDate).toISOString());
        formData.append('price', this.state.price);
        formData.append('file', this.state.file);

        ItemActions.updateItem(this.state.id, formData);
    }

    render() {
        return (
            <div>
                <h3>Edit item</h3>
                <hr/>

                <form onSubmit={this.handleUpdateItem}>
                    <input type="hidden" value={this.state.id} onChange={this.handleInputChange}/>
                    <ItemInputFields handleInputChange={this.handleInputChange} fields={this.state}/>
                    <button type="submit" class="btn btn-primary">Update item</button>
                </form>
            </div>
        );
    }
}
