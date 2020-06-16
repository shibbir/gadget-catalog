import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import BrandSchema from "./brand.schema";
import { createBrand, updateBrand, getBrand } from "./brand.actions";
import { TextInput } from "../../core/client/components/FieldInput/FieldInputs";

function BrandForm({_id} = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(_id) {
            dispatch(getBrand(_id));
        }
    }, [_id, dispatch]);

    const brand = useSelector(state => state.brandReducer.brand);

    return (
        <Formik
            initialValues={{
                name: _id && brand ? brand.name : ""
            }}
            displayName="BrandForm"
            enableReinitialize={true}
            validationSchema={BrandSchema}
            onSubmit={(values, actions) => {
                if(_id) {
                    dispatch(updateBrand({...values, _id}));
                } else {
                    dispatch(createBrand(values));
                    actions.resetForm();
                }

                actions.setSubmitting(false);
            }}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: "text",
                        name: "name",
                        label: "Name",
                        required: true
                    }}/>
                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Submit</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

BrandForm.propTypes = {
    _id: PropTypes.string
};

export default BrandForm;
