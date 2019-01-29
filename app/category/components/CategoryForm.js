import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Divider, Button, Message, Icon } from 'semantic-ui-react';
import { FileInput, TextInput } from '../../shared/components/FieldInput/FieldInputs';

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
        let formData = new FormData();

        for(let key in formValues) {
            if(formValues.hasOwnProperty(key)) {
                formData.append(key, formValues[key]);
            }
        }

        if(this.props.categoryId) {
            this.props.updateCategory(formData, this.props.categoryId);
        } else {
            this.props.createCategory(formData);
        }
    }

    render() {
        const { user, handleSubmit, reset, submitting, pristine, submitButtonText } = this.props;

        return (
            <div>
                { user && user.isAdmin &&
                    <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                        <Field name="name" label="Name" attributes={{ type: 'text'}} component={TextInput} validate={[ required ]}/>
                        <Field name="file" label="Upload" component={FileInput}/>
                        <Divider hidden/>
                        <Button.Group>
                            <Button type="submit" positive disabled={submitting}>{submitButtonText}</Button>
                            <Button.Or/>
                            <Button type="button" disabled={pristine || submitting} onClick={reset}>Reset form</Button>
                        </Button.Group>
                    </Form>
                }

                { !user || !user.isAdmin &&
                    <Message negative>
                        <Message.Header>
                            <Icon name="lock" size="large"/>
                            You don't have the permission!
                        </Message.Header>
                    </Message>
                }
            </div>
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
