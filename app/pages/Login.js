import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Segment, Header, Icon, Divider } from 'semantic-ui-react';
import store from '../store';
import { login } from '../actions/AuthActions';
import { TextInput } from '../components/FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';

class Login extends React.Component {
    handleSubmit(formValues) {
        store.dispatch(login({
            email: formValues.email,
            password: formValues.password
        }));
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        const loginPageStyle = {
            paddingTop: '60px'
        };
        const columnStyle = {
            maxWidth: '450px'
        };

        return (
            <div style={loginPageStyle}>
                <div className="ui middle aligned center aligned grid">
                    <div style={columnStyle}>
                        <Header as="h2" className="teal center aligned">
                            <div className="content">
                                Log-in to your account
                            </div>
                        </Header>
                        <Form className="large" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                            <Segment className="stacked">
                                <Field name="email"
                                    attributes={{ id: 'email', type: 'email', placeholder: 'E-mail address', icon: 'mail', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Field name="password"
                                    attributes={{ id: 'password', type: 'password', placeholder: 'Password', icon: 'lock', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Button fluid type="submit" className="large teal" disabled={submitting}>Login</Button>
                            </Segment>
                        </Form>
                        <Divider hidden/>
                        <Segment className="stacked center aligned">
                            <Link to="register">Sign up for a new account</Link>
                            <Divider horizontal>or, use social service</Divider>
                            <div>
                                <Button color="facebook" href="/auth/facebook">
                                    <Icon name="facebook"/> Facebook
                                </Button>
                                <Button color="google plus" href="/auth/google">
                                    <Icon name="google plus"/> Google
                                </Button>
                            </div>
                        </Segment>
                    </div>
                </div>
            </div>
        );
    }
}

Login = reduxForm({
    form: 'Login'
})(Login);

export default Login;
