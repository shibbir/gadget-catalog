import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import * as iziToast from "izitoast/dist/js/izitoast";
import { useSelector, useDispatch } from "react-redux";
import BrandSchema from "./brand.schema";
import { createBrand, updateBrand, getBrand } from "./brand.actions";
import { TextInput } from "../../core/client/components/FieldInput/FieldInputs";

function BrandForm({id} = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getBrand(id));
        }
    }, [id, dispatch]);

    const brand = useSelector(state => state.brandReducer.brand);

    return (
        <Formik
            initialValues={{
                name: id && brand ? brand.name : ""
            }}
            displayName="BrandForm"
            enableReinitialize={true}
            validationSchema={BrandSchema}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateBrand(values, id)).then(function() {
                        iziToast['success']({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "bottomRight"
                        });
                    });
                } else {
                    dispatch(createBrand(values)).then(function() {
                        iziToast['success']({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "bottomRight"
                        });
                        actions.resetForm();
                    });
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
    id: PropTypes.string
};

export default BrandForm;
