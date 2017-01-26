import React from 'react';

import BrandStore from '../../stores/BrandStore';
import * as BrandActions from '../../actions/BrandActions';
import CategoryStore from '../../stores/CategoryStore';
import * as CategoryActions from '../../actions/CategoryActions';

export default class ItemInputFields extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: CategoryStore.categories,
            brands: BrandStore.brands
        };
    }

    componentDidMount() {
        BrandActions.getBrands();
        CategoryActions.getCategories();
    }

    componentWillMount() {
        BrandStore.on('receiveBrands', () => {
            this.setState({ brands: BrandStore.brands });
        });

        CategoryStore.on('receiveCategories', () => {
            this.setState({ categories: CategoryStore.categories });
        });
    }

    componentWillUnmount() {
        BrandStore.on('receiveBrands', () => {
            this.setState({ brands: BrandStore.brands });
        });

        CategoryStore.removeListener('receiveCategories', () => {
            this.setState({ categories: CategoryStore.categories });
        });
    }

    render() {
        const { fields, handleInputChange } = this.props;

        let categoryOptions = this.state.categories.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )
        });

        let brandOptions = this.state.brands.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )
        });

        return (
            <div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value={fields.name} onChange={handleInputChange}/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea rows="10" class="form-control" id="description" name="description" value={fields.description} onChange={handleInputChange}></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select class="form-control" id="category" name="category" value={fields.category} onChange={handleInputChange}>
                        <option value="">Select category</option>
                        {categoryOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="brand">Brand</label>
                    <select class="form-control" id="brand" name="brand" value={fields.brand} onChange={handleInputChange}>
                        <option value="">Select brand</option>
                        {brandOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="purchase-date">Purchase date</label>
                    <input type="date" class="form-control" id="purchase-date" name="purchaseDate" value={fields.purchaseDate} onChange={handleInputChange}/>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price" name="price" value={fields.price} onChange={handleInputChange}/>
                </div>
                <div class="form-group">
                    <label for="file">Upload image</label>
                    <input type="file" class="form-control-file" id="file" name="file" accept="image/*" onChange={handleInputChange}/>
                </div>
            </div>
        );
    }
}
