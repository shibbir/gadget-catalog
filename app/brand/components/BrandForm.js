import React from 'react';
import { Form, withFormik } from 'formik';
import { Divider, Button } from 'semantic-ui-react';
import BrandSchema from '../brand.schema';
import { TextInput } from '../../shared/components/FieldInput/FieldInputs';

class BrandForm extends React.Component {
    constructor(props) {
        super();

        if(props.brandId) {
            props.fetchBrand(props.brandId);
        }
    }

    render() {
        const { handleSubmit, isSubmitting } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: 'text',
                        name: 'name',
                        label: 'Name',
                        required: true
                    }}/>
                    <Divider hidden/>
                    <Button.Group>
                        <Button type="submit" positive disabled={isSubmitting}>Submit</Button>
                        <Button.Or/>
                        <Button type="reset" disabled={isSubmitting}>Reset</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

BrandForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        if(props.brandId && props.brand) {
            return {
                name: props.brand.name
            };
        }

        return {
            name: ''
        };
    },

    validationSchema: BrandSchema,

    handleSubmit: (formValues, { setSubmitting, resetForm, props }) => {
        if(props.brandId) {
            props.updateBrand(formValues, props.brandId);
        } else {
            props.createBrand(formValues);
            resetForm();
        }

        setSubmitting(false);
    },

    displayName: 'BrandForm'
})(BrandForm);

export default BrandForm;
