import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as iziToast from "izitoast/dist/js/izitoast";
import { Button, Segment, Header, Divider, Image, Modal, Message, Icon } from "semantic-ui-react";

import store from "../../store";
import { login } from "../user.actions";
import { loginSchema, passwordResetSchema } from "../user.schema";
import OAuthProvider from "../../shared/components/OAuthProvider";
import { TextInput } from "../../shared/components/FieldInput/FieldInputs";

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            emailSent: false,
            closeOnDimmerClick: false,
            forgotpasswordResponse: "",
            openPasswordResetModal: false
        };
    }

    openPasswordResetModal(e) {
        e.preventDefault();

        this.setState({openPasswordResetModal: true});
    }

    closePasswordResetModal() {
        this.setState({forgotpassowrdResponse: ""});
        this.setState({openPasswordResetModal: false});
    }

    render() {
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
                                Log-in to your account
                            </div>
                        </Header>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={loginSchema}
                            onSubmit={(values, actions) => {
                                store.dispatch(login({
                                    email: values.email,
                                    password: values.password
                                })).catch(function(result) {
                                    iziToast.error({
                                        message: "Invalid email or password!",
                                        position: "bottomRight",
                                        timeout: 2000
                                    });
                                });
                                actions.setSubmitting(false);
                            }}
                        >
                            <Form className="ui form large">
                                <Segment className="stacked">
                                    <TextInput attributes={{
                                        name: "email",
                                        type: "email",
                                        icon: "mail",
                                        placeholder: "E-mail address",
                                        autoComplete: "username"
                                    }}/>

                                    <TextInput attributes={{
                                        name: "password",
                                        type: "password",
                                        icon: "lock",
                                        placeholder: "Password",
                                        autoComplete: "current-password"
                                    }}/>

                                    <Button fluid type="submit" className="large teal">Login</Button>
                                    <div><Link to="#" onClick={e => this.openPasswordResetModal(e)}>Forgot password?</Link></div>

                                    <Divider hidden/>
                                    Don't have an account? <Link to="/register">Sign up</Link>.
                                </Segment>
                            </Form>
                        </Formik>
                        <OAuthProvider/>
                    </div>
                </div>

                <Modal dimmer size="tiny" open={this.state.openPasswordResetModal} closeOnDimmerClick={this.state.closeOnDimmerClick} onClose={() => this.closePasswordResetModal()}>
                    { this.state.emailSent &&
                        <Message info icon>
                            <Icon name="mail"/>
                            <Message.Content>
                                <Message.Header>Check your email</Message.Header>
                                We just sent an email to you with a link to reset your password!
                            </Message.Content>
                        </Message>
                    }
                    { this.state.forgotpasswordResponse &&
                        <Message error icon>
                            <Icon name="frown"/>
                            <Message.Content>
                                <Message.Header>Attention!</Message.Header>
                                {this.state.forgotpasswordResponse}
                            </Message.Content>
                        </Message>
                    }
                    { !this.state.emailSent &&
                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={passwordResetSchema}
                            onSubmit={(values, actions) => {
                                axios.post("/api/forgotpassowrd", {...values}).then(() => {
                                    this.setState({emailSent: true});
                                    this.setState({closeOnDimmerClick: true});
                                    this.setState({forgotpasswordResponse: ""});
                                }).catch(error => {
                                    this.setState({forgotpasswordResponse: error.response.data});
                                });
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
                                    <Button color="black" onClick={() => this.closePasswordResetModal()}>
                                        Cancel
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
                    }
                </Modal>
            </div>
        );
    }
}
