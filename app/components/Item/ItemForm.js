import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
let moment = require('moment');

import { FileInput, TextInput, DropdownField, TextareaField } from '../FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';
const number = value => value && isNaN(Number(value)) ? 'Please enter a decimal number' : undefined;

class ItemForm extends React.Component {
    componentWillMount() {
        this.props.getBrands();
        this.props.getCategories();

        if(this.props.itemId) {
            this.props.fetchItem(this.props.itemId);
        }
    }

    handleSubmit(formValues) {
        var formData  = new FormData();

        for(let key in formValues) {
            if(formValues.hasOwnProperty(key)) {
                formData.append(key, formValues[key]);
            }
        }

        if(this.props.itemId) {
            this.props.updateItem(formData, this.props.itemId);
        } else {
            this.props.createItem(formData);
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, submitButtonText } = this.props;

        let categoryOptions = this.props.categories.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            );
        });

        let brandOptions = this.props.brands.map(function(option) {
            return (
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            );
        });

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <Field name="name" id="name" label="Name" type="text" component={TextInput} validate={[ required ]}/>
                    <Field name="description" id="description" label="Description" component={TextareaField}/>
                    <Field name="category" id="category" label="Category" defaultOption="Select category" options={categoryOptions} component={DropdownField} validate={[ required ]}/>
                    <Field name="brand" id="brand" label="Brand" defaultOption="Select brand" options={brandOptions} component={DropdownField} validate={[ required ]}/>
                    <Field name="purchaseDate" id="purchaseDate" label="Purchase date" type="date" component={TextInput} validate={[ required ]}/>
                    <Field name="price" id="price" label="Price" type="number" component={TextInput}/>
                    <Field name="file" id="file" label="Upload" component={FileInput}/>
                    <hr/>
                    <div class="clearfix">
                        <button type="buton" class="btn btn-secondary float-right" disabled={submitting || pristine} onClick={reset}>Reset form</button>
                        <button type="submit" class="btn btn-primary float-right mr-2" disabled={submitting || pristine}>{submitButtonText}</button>
                    </div>
                </form>
            </div>
        );
    }
}

ItemForm = reduxForm({
    form: 'ItemForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(ItemForm);

ItemForm = connect(
    state => ({
        initialValues: state.itemReducer.activeItem.item
    })
)(ItemForm);

export default ItemForm;
