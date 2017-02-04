import React from 'react';
let moment = require('moment');

export default class ItemForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            description: '',
            category: '',
            brand: '',
            purchaseDate: '',
            price: '',
            file: ''
        };

        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.props.getBrands();
        this.props.getCategories();
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'file' ? target.files[0] : target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmission(event) {
        event.preventDefault();

        var formData  = new FormData();

        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('category', this.state.category);
        formData.append('brand', this.state.brand);
        formData.append('purchaseDate', moment(this.state.purchaseDate).toISOString());
        formData.append('price', this.state.price);
        formData.append('file', this.state.file);

        this.props.handleSubmission(formData);
    }

    render() {
        let categoryOptions = this.props.categories.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )
        });

        let brandOptions = this.props.brands.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )
        });

        return (
            <div>
                <form onSubmit={this.handleSubmission}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea rows="10" class="form-control" id="description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="form-control" id="category" name="category" value={this.state.category} onChange={this.handleInputChange}>
                            <option value="">Select category</option>
                            {categoryOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="brand">Brand</label>
                        <select class="form-control" id="brand" name="brand" value={this.state.brand} onChange={this.handleInputChange}>
                            <option value="">Select brand</option>
                            {brandOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="purchase-date">Purchase date</label>
                        <input type="date" class="form-control" id="purchase-date" name="purchaseDate" value={this.state.purchaseDate} onChange={this.handleInputChange}/>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" id="price" name="price" value={this.state.price} onChange={this.handleInputChange}/>
                    </div>
                    <div class="form-group">
                        <label for="file">Upload image</label>
                        <input type="file" class="form-control-file" id="file" name="file" accept="image/*" onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Add item</button>
                </form>
            </div>
        );
    }
}
