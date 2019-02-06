import React from 'react';
import { Form, withFormik } from 'formik';
import { Divider, Button } from 'semantic-ui-react';
import { TextInput, RichEditorInput, DropdownInput, FileInput } from '../../shared/components/FieldInput/NewFieldInputs';

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

    render() {
        const { handleChange, setFieldValue, isSubmitting, handleSubmit, reset, submitButtonText, values } = this.props;

        const categoryOptions = this.props.categories.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        const brandOptions = this.props.brands.map(function(option) {
            return { key: option._id, value: option._id, text: option.name };
        });

        const handleDropdownChange = (e, data) => {
            if (data && data.name) {
                setFieldValue(data.name, data.value);
            }
        }

        const handleFileChange = (e) => {
            setFieldValue('files', e.currentTarget.files);
        }

        return (
            <Form onSubmit={handleSubmit} className="ui form">
                <TextInput attributes={{
                    type: 'text',
                    name: 'name',
                    label: 'Name'
                }}/>
                <RichEditorInput attributes={{
                    value: values.description,
                    name: 'description',
                    label: 'Description',
                    onChange: handleChange
                }}/>
                <DropdownInput attributes={{
                    value: values.categoryId,
                    name: 'categoryId',
                    placeholder: 'Select category',
                    label: 'Category',
                    options: categoryOptions,
                    onChange: handleDropdownChange
                }}/>
                <DropdownInput attributes={{
                    value: values.brandId,
                    name: 'brandId',
                    placeholder: 'Select brand',
                    label: 'Brand',
                    options: brandOptions,
                    onChange: handleDropdownChange
                }}/>
                <TextInput attributes={{
                    type: 'date',
                    name: 'purchaseDate',
                    label: 'Purchase date'
                }}/>
                <TextInput attributes={{
                    type: 'number',
                    name: 'price',
                    label: 'Price'
                }}/>
                <FileInput attributes={{
                    type: 'file',
                    name: 'file',
                    label: 'Upload images',
                    onChange: handleFileChange
                }}/>
                <Divider hidden/>
                <Button.Group>
                    <Button type="submit" positive disabled={isSubmitting}>Submit</Button>
                    <Button.Or/>
                    <Button type="button" disabled={isSubmitting} onClick={reset}>Reset</Button>
                </Button.Group>
            </Form>
        );
    }
}

ItemForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        if(props.item) {
            return {
                name: props.item.name,
                description: props.item.description,
                categoryId: props.item.categoryId,
                brandId: props.item.brandId,
                purchaseDate: props.item.purchaseDate,
                price: props.item.price
            };
        }

        return {
            name: '',
            description: '',
            categoryId: '',
            brandId: '',
            purchaseDate: '',
            price: '',
            files: ''
        };
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        let formData = new FormData();

        if(values.files) {
            for(let index = 0; index < values.files.length; index++) {
                formData.append('files', values.files[index]);
            }
            delete values.files;
        }

        for(let key in values) {
            if(values.hasOwnProperty(key)) {
                formData.append(key, values[key]);
            }
        }

        if(props.itemId) {
            props.updateItem(formData, props.itemId);
        } else {
            props.createItem(formData);
        }

        setSubmitting(false);
    },

    displayName: 'ItemForm',
})(ItemForm);

export default ItemForm;
