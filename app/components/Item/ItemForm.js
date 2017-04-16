import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Divider, Button } from 'semantic-ui-react';
import { TextInput, RichEditorInput, DropdownField, FileInput } from '../FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';
const number = value => value && isNaN(Number(value)) ? 'Please enter a decimal number' : undefined;

class ItemForm extends React.Component {
    constructor(props) {
        super();

        props.getBrands();
        props.getCategories();

        if(props.itemId) {
            props.fetchItem(props.itemId);
        } else {
            props.resetItemState();
        }
    }

    handleSubmit(formValues) {
        let formData = new FormData();

        if(formValues.files) {
            for(let index = 0; index < formValues.files.length; index++) {
                formData.append('files', formValues.files[index]);
            }
            delete formValues.files;
        }

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
        const { handleSubmit, reset, submitting, pristine, submitButtonText } = this.props;

        const categoryOptions = this.props.categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        const brandOptions = this.props.brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field name="name" label="Name" attributes={{type: 'text'}} component={TextInput} validate={[ required ]}/>
                <Field name="description" label="Description" component={RichEditorInput}/>
                <Field name="categoryId" placeholder="Select category" label="Category" options={categoryOptions} component={DropdownField} validate={[ required ]}/>
                <Field name="brandId" placeholder="Select brand" label="Brand" options={brandOptions} component={DropdownField} validate={[ required ]}/>
                <Field name="purchaseDate" label="Purchase date" attributes={{type: 'date'}} component={TextInput} validate={[ required ]}/>
                <Field name="price" label="Price" attributes={{type: 'number'}} component={TextInput}/>
                <Field name="files" label="Upload images" component={FileInput}/>
                <Divider hidden/>
                <Button.Group>
                    <Button type="submit" positive disabled={submitting}>{submitButtonText}</Button>
                    <Button.Or/>
                    <Button type="button" disabled={pristine || submitting} onClick={reset}>Reset</Button>
                </Button.Group>
            </Form>
        );
    }
}

ItemForm = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(ItemForm);

ItemForm = connect(
    state => ({
        initialValues: state.itemReducer.activeItem.item
    })
)(ItemForm);

export default ItemForm;
