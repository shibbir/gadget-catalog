import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

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
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field name="email" id="email" label="Email" type="email" placeholder="Email address" component={TextInput} validate={[ required ]}/>
                <Field name="password" id="password" label="Email" type="password" placeholder="Password" component={TextInput} validate={[ required ]}/>
                <button type="submit" class="btn btn-primary" disabled={submitting || pristine}>Login</button> | <Link to="register">Sign up for a new account</Link>
            </form>
        );
    }
}

Login = reduxForm({
    form: 'Login'
})(Login);

export default Login;
