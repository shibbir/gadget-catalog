import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Divider, Button, Message, Icon } from 'semantic-ui-react';
import { TextInput } from '../FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';

class BrandForm extends React.Component {
    constructor(props) {
        super();

        if(props.brandId) {
            props.fetchBrand(props.brandId);
        } else {
            props.resetBrandState();
        }
    }

    handleSubmit(formValues) {
        if(this.props.brandId) {
            this.props.updateBrand(formValues, this.props.brandId);
        } else {
            this.props.createBrand(formValues);
        }
    }

    render() {
        const { handleSubmit, reset, submitting, pristine, submitButtonText } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <Field name="name" label="Name" attributes={{ type: 'text'}} component={TextInput} validate={[ required ]}/>
                    <Divider hidden/>
                    <Button.Group>
                        <Button type="submit" positive disabled={submitting}>{submitButtonText}</Button>
                        <Button.Or/>
                        <Button type="button" disabled={pristine || submitting} onClick={reset}>Reset form</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

BrandForm = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(BrandForm);

BrandForm = connect(
    state => ({
        initialValues: state.brandReducer.activeBrand.brand
    })
)(BrandForm);

export default BrandForm;
