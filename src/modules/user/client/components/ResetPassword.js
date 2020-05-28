import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { Divider, Button, Segment, Header, Image, Message } from "semantic-ui-react";

import { resetPassword } from "../user.actions";
import { resetPasswordSchema } from "../user.schema";
import { TextInput } from "../../../core/client/components/FieldInput/FieldInputs";

export default function ResetPassword() {
    const [isPasswordReset, setPasswordResetStatus] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

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

                    { isPasswordReset &&
                        <Message info>
                            Your password is changed. Please <Link to="/login">sign in</Link> to your account.
                        </Message>
                    }

                    <Formik
                        initialValues={{
                            newPassword: "",
                            confirmNewPassword: ""
                        }}
                        validationSchema={resetPasswordSchema}
                        onSubmit={(values, actions) => {
                            dispatch(resetPassword(values, location.search)).then(() => {
                                setPasswordResetStatus(true);
                            });

                            actions.resetForm();
                            actions.setSubmitting(false);
                        }}
                    >
                        <Form className="ui form large">
                            <Segment className="stacked">
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

                                <Button fluid type="submit" className="large teal">Reset password</Button>
                                <Divider hidden/>
                                Remembered you password? <Link to="/login">Sign in</Link>.
                            </Segment>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
