import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, withFormik } from "formik";
import { Divider, Button, Segment, Header, Image } from "semantic-ui-react";

import { resetPassword } from "../user.actions";
import { resetPasswordSchema } from "../user.schema";
import { TextInput } from "../../shared/components/FieldInput/FieldInputs";

class ResetPassword extends React.Component {
    render() {
        const { handleSubmit, isSubmitting } = this.props;

        const pageStyle = {
            paddingTop: "85px"
        };
        const columnStyle = {
            maxWidth: "450px"
        };

        return (
            <div style={pageStyle}>
                <div className="ui middle aligned center aligned grid">
                    <div style={columnStyle}>
                        <Header as="h2" className="teal center aligned">
                            <Image src={`images/logo.png`}/>
                            <div className="content">
                                Reset your password
                            </div>
                        </Header>
                        <Form onSubmit={handleSubmit} className="ui form large">
                            <Segment className="stacked">
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
                                
                                <Button fluid type="submit" className="large teal" disabled={isSubmitting}>Save</Button>
                                <Divider hidden/>
                                Remembered you password? <Link to="/login">Sign in</Link>.
                            </Segment>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword = withFormik({
    displayName: "ResetPassword",

    validationSchema: resetPasswordSchema,

    mapPropsToValues: () => {
        return {
            newPassword: "",
            confirmNewPassword: ""
        };
    },

    handleSubmit: (formValues, { setSubmitting, resetForm, props }) => {
        props.resetPassword(formValues, props.location.search);

        resetForm();
        setSubmitting(false);
    }
})(ResetPassword);

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: formData => {
            dispatch(resetPassword(formData));
        }
    };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
