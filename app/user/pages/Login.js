import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Segment, Header, Divider, Image } from 'semantic-ui-react';
import { Formik, Form } from 'formik';

import store from '../../store';
import SocialAuthService from '../../shared/components/SocialAuthService';
import { login } from '../auth.actions';
import { TextInput } from '../../shared/components/FieldInput/NewFieldInputs';

class Login extends React.Component {
    render() {
        const pageStyle = {
            paddingTop: '85px'
        };
        const columnStyle = {
            maxWidth: '450px'
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
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                let errors = {};
                                if (!values.email) {
                                    errors.email = 'This field must not be empty';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'This field must not be empty';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                store.dispatch(login({
                                    email: values.email,
                                    password: values.password
                                }));
                                setSubmitting(false);
                            }
                        }>
                            {({ isSubmitting }) => (
                                <Form className="ui form large">
                                    <Segment className="stacked">
                                        <TextInput attributes={{
                                            name: 'email',
                                            type: 'email',
                                            icon: 'mail',
                                            iconPosition: 'left'
                                        }}/>

                                        <TextInput attributes={{
                                            name: 'password',
                                            type: 'password',
                                            icon: 'lock',
                                            iconPosition: 'left'
                                        }}/>

                                        <Button fluid type="submit" className="large teal" disabled={isSubmitting}>Login</Button>

                                        <Divider hidden/>
                                        Don't have an account? <Link to="register">Sign up</Link>.
                                    </Segment>
                                </Form>
                            )}
                        </Formik>
                        <SocialAuthService/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
