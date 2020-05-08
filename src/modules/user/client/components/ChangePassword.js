import React from "react";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import { Divider, Button } from "semantic-ui-react";

import { changePasswordSchema } from "../user.schema";
import { changePassword } from "../user.actions";
import { TextInput } from "../../../core/client/components/FieldInput/FieldInputs";

class ChangePassword extends React.Component {
    render() {
        const { handleSubmit, isSubmitting } = this.props;

        return (
            <div>
                <h3>Change local account password</h3>
                <Divider section/>

                <Form onSubmit={handleSubmit} className="ui form">
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
                        <Button type="submit" positive disabled={isSubmitting}>Change password</Button>
                        <Button.Or/>
                        <Button type="reset" disabled={isSubmitting}>Reset</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

ChangePassword = withFormik({
    displayName: "ChangePassword",

    validationSchema: changePasswordSchema,

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
    }
})(ChangePassword);

const mapDispatchToProps = dispatch => {
    return {
        changePassword: formData => {
            dispatch(changePassword(formData));
        }
    };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
