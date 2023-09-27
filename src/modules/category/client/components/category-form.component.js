import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import CategorySchema from "../category.schema";
import { createCategory, updateCategory, getCategory } from "../category.actions";
import { TextInput } from "../../../core/client/components/FieldInputs";

export default function CategoryForm({id} = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getCategory(id));
        }
    }, [id, dispatch]);

    const category = useSelector(state => state.categoryReducer.category);

    return (
        <Formik
            initialValues={{
                name: id && category ? category.name : "",
                group: id && category ? category.group : ""
            }}
            displayName="CategoryForm"
            enableReinitialize={true}
            validationSchema={CategorySchema}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateCategory(values, id)).then(function() {
                        iziToast["success"]({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "bottomRight"
                        });
                    });
                } else {
                    dispatch(createCategory(values)).then(function() {
                        iziToast["success"]({
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
                    <Button.Group>
                        <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                        <Button.Or/>
                        <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                    </Button.Group>
                </Form>
            )}
        </Formik>
    );
}
