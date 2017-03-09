import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

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
        const { handleSubmit, pristine, reset, submitting, submitButtonText } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field name="name" id="name" label="Name" type="text" component={TextInput} validate={[ required ]}/>
                <Field name="file" id="file" label="Upload" component={FileInput}/>
                <hr/>
                <div class="clearfix">
                    <button type="buton" class="btn btn-secondary float-right" disabled={submitting || pristine} onClick={reset}>Reset form</button>
                    <button type="submit" class="btn btn-primary float-right mr-2" disabled={submitting || pristine}>{submitButtonText}</button>
                </div>
            </form>
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
