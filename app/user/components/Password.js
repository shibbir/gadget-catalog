import React from "react";
import { Form, withFormik } from "formik";
import { Divider, Button } from "semantic-ui-react";

import { passwordSchema } from "../auth.schema";
import { TextInput } from "../../shared/components/FieldInput/FieldInputs";

class Password extends React.Component {
    render() {
        const { handleSubmit, isSubmitting } = this.props;

        return (
            <div>
                <h3>Change local password</h3>
                <Divider section/>

                <Form onSubmit={handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: "password",
                        name: "currentPassword",
                        label: "Current password"
                    }}/>
                    <TextInput attributes={{
                        type: "password",
                        name: "newPassword",
                        label: "New password"
                    }}/>
                    <TextInput attributes={{
                        type: "password",
                        name: "confirmNewPassword",
                        label: "Confirm new password"
                    }}/>
                    <Divider hidden/>
                    <Button.Group>
                        <Button type="submit" positive disabled={isSubmitting}>Change password</Button>
                        <Button.Or/>
                        <Button type="reset" disabled={isSubmitting}>Reset</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

Password = withFormik({
    validationSchema: passwordSchema,

    mapPropsToValues: () => {
        return {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        };
    },

    handleSubmit: (formValues, { setSubmitting, resetForm, props }) => {
        props.changePassword(formValues);

        resetForm();
        setSubmitting(false);
    },

    displayName: "Password"
})(Password);

export default Password;
