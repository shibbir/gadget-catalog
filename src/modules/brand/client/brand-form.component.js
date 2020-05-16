import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";
import BrandSchema from "./brand.schema";
import { createBrand, updateBrand, getBrand } from "./brand.actions";
import { TextInput } from "../../core/client/components/FieldInput/FieldInputs";

export default function BrandForm({id}=props) {
    const dispatch = useDispatch();

    if(id) {
        useEffect(() => {
            dispatch(getBrand(id));
        }, []);
    }

    const brand = useSelector(state => state.brandReducer.brand);

    return (
        <div>
            <Formik
                initialValues={{
                    name: id && brand ? brand.name : ""
                }}
                displayName="BrandForm"
                enableReinitialize={true}
                validationSchema={BrandSchema}
                onSubmit={(values, actions) => {
                    if(id) {
                        dispatch(updateBrand(values, id));
                    } else {
                        dispatch(createBrand(values));
                        actions.resetForm();
                    }

                    actions.setSubmitting(false);
                }}
            >
                {props => (
                    <Form onSubmit={props.handleSubmit} className="ui form">
                        <TextInput attributes={{
                            type: "text",
                            name: "name",
                            label: "Name",
                            required: true
                        }}/>
                        <Divider hidden/>
                        <Button type="submit" positive disabled={props.isSubmitting}>Submit</Button>
                        <Button type="reset" disabled={props.isSubmitting}>Reset</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
