import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Segment, Header, Icon, Divider, Image } from 'semantic-ui-react';
import store from '../store';
import { register } from '../actions/AuthActions';
import { TextInput } from '../components/FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';

class Register extends React.Component {
    handleSubmit(formValues) {
        store.dispatch(register({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        }));
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

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
                                Sign up for a new account
                            </div>
                        </Header>
                        <Form className="large" onSubmit={handleSubmit(this.handleSubmit.bind(this))} error={invalid}>
                            <Segment className="stacked">
                                <Field name="name"
                                    attributes={{ id: 'name', type: 'text', placeholder: 'Name', icon: 'users', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Field name="email"
                                    attributes={{ id: 'email', type: 'email', placeholder: 'E-mail address', icon: 'mail', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Field name="password"
                                    attributes={{ id: 'password', type: 'password', placeholder: 'Password', icon: 'lock', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Button fluid type="submit" className="large teal" disabled={submitting}>Register</Button>
                                <Divider hidden/>
                                Already have an account? <Link to="login">Sign in</Link>.
                            </Segment>
                        </Form>
                        <Divider hidden/>
                        <Segment className="stacked center aligned">
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

Register = reduxForm({
    form: 'Register'
})(Register);

export default Register;
