import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import * as iziToast from "izitoast/dist/js/izitoast";
import { useSelector, useDispatch } from "react-redux";
import VendorSchema from "./vendor.schema";
import { createVendor, updateVendor, getVendor } from "./vendor.actions";
import { TextInput, TextareaInput } from "../../core/client/components/FieldInput/FieldInputs";

function VendorForm({id} = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getVendor(id));
        }
    }, [id, dispatch]);

    const vendor = useSelector(state => state.vendorReducer.vendor);

    return (
        <Formik
            initialValues={{
                name: id && vendor ? vendor.name : "",
                email: id && vendor ? vendor.email : "",
                website: id && vendor ? vendor.website : "",
                address: id && vendor ? vendor.address : ""
            }}
            displayName="VendorForm"
            enableReinitialize={true}
            validationSchema={VendorSchema}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateVendor(values, id)).then(function() {
                        iziToast['success']({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "bottomRight"
                        });
                    });
                } else {
                    dispatch(createVendor(values)).then(function() {
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
                    <TextInput attributes={{
                        type: "email",
                        name: "email",
                        label: "Email"
                    }}/>
                    <TextInput attributes={{
                        type: "url",
                        name: "website",
                        label: "Website"
                    }}/>
                    <TextareaInput attributes={{
                        name: "address",
                        label: "Address"
                    }}/>
                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

VendorForm.propTypes = {
    id: PropTypes.string
};

export default VendorForm;
