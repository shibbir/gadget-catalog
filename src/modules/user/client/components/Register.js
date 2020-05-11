import React from "react";
import { Link } from "react-router-dom";
import { Form, withFormik } from "formik";
import { Button, Segment, Header, Divider, Image } from "semantic-ui-react";

import store from "../../../core/client/store";
import { register } from "../user.actions";
import { registerSchema } from "../user.schema";
import OAuthProvider from "../../../core/client/components/OAuthProvider";
import { TextInput } from "../../../core/client/components/FieldInput/FieldInputs";

class Register extends React.Component {
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
                                Sign up for a new account
                            </div>
                        </Header>
                        <Form onSubmit={handleSubmit} className="ui form large">
                            <Segment className="stacked">
                                <TextInput attributes={{
                                    type: "text",
                                    name: "name",
                                    placeholder: "Name",
                                    icon: "users",
                                    iconPosition: "left"
                                }}/>
                                <TextInput attributes={{
                                    type: "email",
                                    name: "email",
                                    placeholder: "E-mail address",
                                    icon: "mail",
                                    iconPosition: "left",
                                    autoComplete: "username"
                                }}/>
                                <TextInput attributes={{
                                    type: "password",
                                    name: "password",
                                    placeholder: "Password",
                                    icon: "lock",
                                    iconPosition: "left",
                                    autoComplete: "new-password"
                                }}/>

                                <Button fluid type="submit" className="large teal" disabled={isSubmitting}>Register</Button>
                                <Divider hidden/>
                                Already have an account? <Link to="/login">Sign in</Link>.
                            </Segment>
                        </Form>
                        <OAuthProvider/>
                    </div>
                </div>
            </div>
        );
    }
}

Register = withFormik({
    validationSchema: registerSchema,

    mapPropsToValues: () => {
        return {
            name: "",
            email: "",
            password: ""
        };
    },

    handleSubmit: (formValues, { setSubmitting, resetForm }) => {
        store.dispatch(register({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        }));

        resetForm();
        setSubmitting(false);
    },

    displayName: "Register"
})(Register);

export default Register;
