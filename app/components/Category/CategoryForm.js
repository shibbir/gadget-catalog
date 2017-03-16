import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Divider, Button } from 'semantic-ui-react';

import { FileInput, TextInput } from '../FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';

class CategoryForm extends React.Component {
    constructor(props) {
        super();

        if(props.categoryId) {
            props.fetchCategory(props.categoryId);
        } else {
            props.resetCategoryState();
        }
    }

    handleSubmit(formValues) {
        var formData = new FormData();

        for(let key in formValues) {
            if(formValues.hasOwnProperty(key)) {
                formData.append(key, formValues[key]);
            }
        }

        if(this.props.categoryId) {
            this.props.updateCategory(formData, this.props.categoryId);
        }
    }

    render() {
        const { handleSubmit, reset, submitting, submitButtonText } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field name="name" label="Name" attributes={{ type: 'text'}} component={TextInput} validate={[ required ]}/>
                <Field name="file" label="Upload" component={FileInput}/>
                <Divider hidden/>
                <Button.Group>
                    <Button positive type="submit" disabled={submitting}>{submitButtonText}</Button>
                    <Button.Or />
                    <Button disabled={submitting} onClick={reset}>Reset form</Button>
                </Button.Group>
            </Form>
        );
    }
}

CategoryForm = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(CategoryForm);

CategoryForm = connect(
    state => ({
        initialValues: state.categoryReducer.activeCategory.category
    })
)(CategoryForm);

export default CategoryForm;
