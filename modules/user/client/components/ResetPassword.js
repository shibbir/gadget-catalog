import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { Divider, Button, Segment, Header, Image, Message } from "semantic-ui-react";

import { resetPassword } from "../user.actions";
import { resetPasswordSchema } from "../user.schema";
import { TextInput } from "../../../core/client/components/FieldInput/FieldInputs";

class ResetPassword extends React.Component {
    constructor() {
        super();

        this.state = { resetPassword: false };
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
                                Reset your password
                            </div>
                        </Header>
                        { this.state.resetPassword &&
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
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                this.props.resetPassword(values, this.props.location.search).then(() => {
                                    this.setState({resetPassword: true});
                                });

                                resetForm();
                                setSubmitting(false);
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
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (formData, query) => dispatch(resetPassword(formData, query))
    };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
