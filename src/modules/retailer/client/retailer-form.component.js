import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import * as iziToast from "izitoast/dist/js/izitoast";
import { useSelector, useDispatch } from "react-redux";
import RetailerSchema from "./retailer.schema";
import { createRetailer, updateRetailer, getRetailer } from "./retailer.actions";
import { TextInput, TextareaInput } from "../../core/client/components/FieldInput/FieldInputs";

function RetailerForm({id} = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getRetailer(id));
        }
    }, [id, dispatch]);

    const retailer = useSelector(state => state.retailerReducer.retailer);

    return (
        <Formik
            initialValues={{
                name: id && retailer ? retailer.name : "",
                email: id && retailer ? retailer.email : "",
                website: id && retailer ? retailer.website : "",
                address: id && retailer ? retailer.address : ""
            }}
            displayName="RetailerForm"
            enableReinitialize={true}
            validationSchema={RetailerSchema}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateRetailer(values, id)).then(function() {
                        iziToast['success']({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "bottomRight"
                        });
                    });
                } else {
                    dispatch(createRetailer(values)).then(function() {
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

RetailerForm.propTypes = {
    id: PropTypes.string
};

export default RetailerForm;
