import React from 'react';
import { hashHistory } from 'react-router';

import CategoryStore from '../stores/CategoryStore';
import * as CategoryActions from '../actions/CategoryActions';
import ItemStore from '../stores/ItemStore';
import * as ItemActions from '../actions/ItemActions';

export default class AddItem extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            category: '',
            purchaseDate: '',
            price: '',
            categories: CategoryStore.categories
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handlePurchaseDateChange = this.handlePurchaseDateChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        CategoryActions.getCategories();
    }

    componentWillMount() {
        CategoryStore.on('receiveCategories', () => {
            this.setState({ categories: CategoryStore.categories });
        });

        ItemStore.on('receiveItem', () => {
            let item = ItemStore.getReceivedItem();
            hashHistory.push({ pathname: `items/${item._id}` });
        });
    }

    componentWillUnmount() {
        CategoryStore.removeListener('receiveCategories', () => {
            this.setState({ categories: CategoryStore.categories });
        });

        ItemStore.removeListener('receiveItem', () => {
            let item = ItemStore.getReceivedItem();
            hashHistory.push({ pathname: `items/${item._id}` });
        });
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
    }

    handlePurchaseDateChange(event) {
        this.setState({ purchaseDate: event.target.value });
    }

    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }

    addItem(event) {
        event.preventDefault();

        ItemActions.saveItem({
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            purchaseDate: this.state.purchaseDate,
            price: this.state.price
        });
    }

    render() {
        let options = this.state.categories.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )
        });

        return (
            <div>
                <h3>Add a new item</h3>
                <hr/>

                <form onSubmit={this.addItem}>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" value={this.state.title} onChange={this.handleTitleChange}/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea rows="10" class="form-control" id="description" value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="form-control" id="category" value={this.state.category} onChange={this.handleCategoryChange}>
                            <option value="">Select category</option>
                            {options}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="purchase-date">Purchase date</label>
                        <input type="date" class="form-control" id="purchase-date" value={this.state.purchaseDate} onChange={this.handlePurchaseDateChange}/>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" id="price" value={this.state.price} onChange={this.handlePriceChange}/>
                    </div>
                    <div class="form-group">
                        <label for="image">Upload image</label>
                        <input type="file" class="form-control-file" id="image"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Add item</button>
                </form>
            </div>
        );
    }
}
