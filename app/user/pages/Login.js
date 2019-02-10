import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Segment, Header, Divider, Image } from 'semantic-ui-react';
import { withFormik, Form } from 'formik';

import store from '../../store';
import { loginSchema } from '../auth.schema';
import OAuthProvider from '../../shared/components/OAuthProvider';
import { login } from '../auth.actions';
import { TextInput } from '../../shared/components/FieldInput/FieldInputs';

class Login extends React.Component {
    render() {
        const pageStyle = {
            paddingTop: '85px'
        };
        const columnStyle = {
            maxWidth: '450px'
        };

        const { handleSubmit, isSubmitting } = this.props;

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
                            <Form onSubmit={handleSubmit} className="ui form large">
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
                                    Don't have an account? <Link to="/register">Sign up</Link>.
                                </Segment>
                            </Form>
                        <OAuthProvider/>
                    </div>
                </div>
            </div>
        );
    }
}

Login = withFormik({
    validationSchema: loginSchema,

    mapPropsToValues: () => {
        return {
            email: '',
            password: ''
        };
    },

    handleSubmit: (values, { setSubmitting }) => {
        store.dispatch(login({
            email: values.email,
            password: values.password
        }));

        setSubmitting(false);
    },

    displayName: 'Login'
})(Login);

export default Login;
