import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Button, Message, Icon } from "semantic-ui-react";
import CategorySchema from "../category.schema";
import { createCategory, updateCategory, fetchCategory } from "../category.actions";
import { TextInput, FileInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function CategoryForm({id} = props) {
    const dispatch = useDispatch();

    if(id) {
        useEffect(() => {
            dispatch(fetchCategory(id));
        }, []);
    }

    const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
    const category = useSelector(state => state.categoryReducer.category);

    return (
        <>
            { loggedInUser && loggedInUser.isAdmin &&
                <Formik
                    initialValues={{
                        name: category ? category.name : "",
                        files: ""
                    }}
                    displayName="CategoryForm"
                    enableReinitialize={true}
                    validationSchema={CategorySchema}
                    onSubmit={(values, actions) => {
                        const formData = new FormData();

                        if(values.files) {
                            for(let index = 0; index < values.files.length; index++) {
                                formData.append("files", values.files[index]);
                            }
                        }

                        delete values.files;

                        for(let key in values) {
                            if(values.hasOwnProperty(key) && values[key]) {
                                formData.append(key, values[key]);
                            }
                        }

                        if(id) {
                            dispatch(updateCategory(formData, id));
                        } else {
                            dispatch(createCategory(formData)).then(function() {
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
                            <FileInput attributes={{
                                type: "file",
                                name: "files",
                                label: "Upload",
                                onChange: e => {
                                    formikProps.setFieldValue("files", e.currentTarget.files);
                                }
                            }}/>
                            <Divider hidden/>
                            <Button.Group>
                                <Button type="submit" positive disabled={formikProps.isSubmitting}>Submit</Button>
                                <Button.Or/>
                                <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                            </Button.Group>
                        </Form>
                    )}
                </Formik>
            }

            { !loggedInUser || !loggedInUser.isAdmin &&
                <Message negative>
                    <Message.Header>
                        <Icon name="lock" size="large"/>
                        You don't have the permission!
                    </Message.Header>
                </Message>
            }
        </>
    );
}
