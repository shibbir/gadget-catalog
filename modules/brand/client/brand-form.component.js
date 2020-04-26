import React from "react";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import BrandSchema from "./brand.schema";
import { createBrand, updateBrand, getBrand } from "./brand.actions";
import { TextInput } from "../../core/client/components/FieldInput/FieldInputs";

class BrandForm extends React.Component {
    constructor(props) {
        super();

        if(props.brandId) {
            props.getBrand(props.brandId);
        }
    }

    render() {
        const { handleSubmit, isSubmitting } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: "text",
                        name: "name",
                        label: "Name",
                        required: true
                    }}/>
                    <Divider hidden/>
                    <Button type="submit" positive disabled={isSubmitting}>Submit</Button>
                    <Button type="reset" disabled={isSubmitting}>Reset</Button>
                </Form>
            </div>
        );
    }
}

BrandForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: props => {
        return {
            name: props.brandId && props.brand ? props.brand.name : ""
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

    displayName: "BrandForm"
})(BrandForm);

const mapStateToProps = (state, props) => {
    return {
        brandId: props.id,
        brand: state.brandReducer.brand
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBrand: (formData) => {
            dispatch(createBrand(formData));
        },
        updateBrand: (formData, itemId) => {
            dispatch(updateBrand(formData, itemId));
        },
        getBrand: (itemId) => {
            dispatch(getBrand(itemId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandForm);
