import React from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Segment, Header, Divider, Image } from "semantic-ui-react";

import { register } from "../user.actions";
import { registerSchema } from "../user.schema";
import OAuthProvider from "../../../core/client/components/OAuthProvider";
import { TextInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function Register() {
    const pageStyle = {
        paddingTop: "85px"
    };
    const columnStyle = {
        maxWidth: "450px"
    };

    const dispatch = useDispatch();

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
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: ""
                        }}
                        displayName="Register"
                        validationSchema={registerSchema}
                        onSubmit={(values, actions) => {
                            dispatch(register(values));

                            actions.resetForm();
                            actions.setSubmitting(false);
                        }}
                    >
                        {formikProps => (
                            <Form onSubmit={formikProps.handleSubmit} className="ui form large">
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

                                    <Button fluid type="submit" className="large teal" disabled={formikProps.isSubmitting}>Register</Button>
                                    <Divider hidden/>
                                    Already have an account? <Link to="/login">Sign in</Link>.
                                </Segment>
                            </Form>
                        )}
                    </Formik>
                    <OAuthProvider/>
                </div>
            </div>
        </div>
    );
}
