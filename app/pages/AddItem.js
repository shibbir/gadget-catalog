import React from 'react';

import CategoryStore from '../stores/CategoryStore';
import * as CategoryActions from '../actions/CategoryActions';

export default class AddItem extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            category: '',
            date: '',
            price: '',
            categories: CategoryActions.getCategories()
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentWillMount() {
        CategoryStore.on('receiveCategories', data => {
            this.setState({ categories: data });
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

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }

    addItem(event) {
        event.preventDefault();
    }

    render() {
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
                            <option value="1">Motherboard</option>
                            <option value="2">Mobile</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="purchase-date">Purchase date</label>
                        <input type="date" class="form-control" id="purchase-date" value={this.state.date} onChange={this.handleDateChange}/>
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
