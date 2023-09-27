import axios from "axios";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useState } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Button, Segment, Header, Divider, Image, Modal, Message, Icon } from "semantic-ui-react";

import { login } from "../user.actions";
import { loginSchema, forgotPasswordSchema } from "../user.schema";
import OAuthProvider from "../../../core/client/components/OAuthProvider";
import { TextInput } from "../../../core/client/components/FieldInputs";

export default function Login() {
    const dispatch = useDispatch();
    const recaptchaRef = useRef();
    const [emailSent, setEmailSent] = useState(false);
    const [isPasswordResetModalActive, setIsPasswordResetModalActive] = useState(false);
    const [forgotpasswordResponse, setForgotpasswordResponse] = useState("");

    return (
        <div className="ui middle aligned center aligned grid">
            <div style={{ maxWidth: "370px" }}>
                <Header as="h2" className="teal center aligned">
                    <Image src={`images/logo.png`}/>
                    <div className="content">
                        Log-in to your account
                    </div>
                </Header>

                <Segment className="stacked">
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions) => {
                            recaptchaRef.current.executeAsync().then(recaptchaToken => {
                                dispatch(login({
                                    username: values.email,
                                    password: values.password,
                                    grant_type: "password",
                                    recaptchaToken
                                })).catch(function(err) {
                                    iziToast["error"]({
                                        timeout: 3000,
                                        title: err.response.status,
                                        message: err.response.data,
                                        position: "topRight"
                                    });
                                });
                                recaptchaRef.current.reset();
                                actions.setSubmitting(false);
                            });
                        }}
                    >
                        <Form className="ui form">
                            <TextInput attributes={{
                                name: "email",
                                type: "email",
                                icon: "mail",
                                placeholder: "Email address",
                                autoComplete: "username"
                            }}/>

                            <TextInput attributes={{
                                name: "password",
                                type: "password",
                                icon: "lock",
                                placeholder: "Password",
                                autoComplete: "current-password"
                            }}/>

                            <ReCAPTCHA
                                size="invisible"
                                ref={recaptchaRef}
                                sitekey={process.env.RECAPTCHA_SITE_KEY}
                            />

                            <Button fluid type="submit" className="large teal">Login</Button>
                        </Form>
                    </Formik>

                    <button className="ui primary tertiary button" onClick={() => setIsPasswordResetModalActive(true)}>Forgot password?</button>

                    <Modal dimmer="blurring" size="tiny" open={isPasswordResetModalActive}>
                        { emailSent &&
                            <Message info icon>
                                <Icon name="mail"/>
                                <Message.Content>
                                    <Message.Header>Check your email</Message.Header>
                                    We just sent an email to you with a link to reset your password!
                                </Message.Content>
                            </Message>
                        }

                        { forgotpasswordResponse &&
                            <Message error icon>
                                <Icon name="frown"/>
                                <Message.Content>
                                    <Message.Header>Attention!</Message.Header>
                                    {forgotpasswordResponse}
                                </Message.Content>
                            </Message>
                        }

                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={forgotPasswordSchema}
                            onSubmit={(values, actions) => {
                                axios.post("/api/forgot-password", {...values}).then(() => {
                                    setEmailSent(true);
                                    setForgotpasswordResponse("");
                                }).catch(error => {
                                    setForgotpasswordResponse(error.response.data);
                                });

                                actions.resetForm();
                                actions.setSubmitting(false);
                            }}
                        >
                            <>
                                <Modal.Header>Reset Your Password</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                                        <Form id="passwordResetForm">
                                            <TextInput attributes={{
                                                name: "email",
                                                type: "email",
                                                icon: "mail",
                                                placeholder: "E-mail address",
                                                autoComplete: "username"
                                            }}/>
                                        </Form>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => {setIsPasswordResetModalActive(false); setEmailSent(false); setForgotpasswordResponse("");}}>
                                        Close
                                    </Button>
                                    <Button
                                        loading={false}
                                        form="passwordResetForm"
                                        type="submit"
                                        positive
                                        icon="arrow right"
                                        labelPosition="right"
                                        content="Send e-mail"
                                    />
                                </Modal.Actions>
                            </>
                        </Formik>
                    </Modal>

                    <Divider hidden/>
                    Don't have an account? <Link to="/register">Sign up</Link>.
                </Segment>

                This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.

                <OAuthProvider/>
            </div>
        </div>
    );
}
