import React from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { Divider, Button } from "semantic-ui-react";

import { changePasswordSchema } from "../user.schema";
import { changePassword } from "../user.actions";
import { TextInput } from "../../../core/client/components/FieldInputs";

export default function ChangePassword() {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Change local account password</h3>
            <Divider section/>

            <Formik
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                }}
                displayName="ChangePassword"
                validationSchema={changePasswordSchema}
                onSubmit={(values, actions) => {
                    dispatch(changePassword(values));

                    actions.resetForm();
                    actions.setSubmitting(false);
                }}
            >
                {formikProps => (
                    <Form onSubmit={formikProps.handleSubmit} className="ui form">
                        <TextInput attributes={{
                            type: "password",
                            name: "currentPassword",
                            label: "Current password",
                            autoComplete: "current-password"
                        }}/>
                        <TextInput attributes={{
                            type: "password",
                            name: "newPassword",
                            label: "New password",
                            autoComplete: "new-password"
                        }}/>
                        <TextInput attributes={{
                            type: "password",
                            name: "confirmNewPassword",
                            label: "Confirm new password",
                            autoComplete: "new-password"
                        }}/>
                        <Divider hidden/>
                        <Button.Group>
                            <Button type="submit" positive disabled={formikProps.isSubmitting}>Change password</Button>
                            <Button.Or/>
                            <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
