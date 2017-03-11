import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <Field name="name" id="name" label="Name" type="text" placeholder="Name" component={TextInput} validate={[ required ]}/>
                <Field name="email" id="email" label="Email" type="email" placeholder="Email address" component={TextInput} validate={[ required ]}/>
                <Field name="password" id="password" label="Email" type="password" placeholder="Password" component={TextInput} validate={[ required ]}/>
                <button type="submit" class="btn btn-primary" disabled={submitting || pristine}>Register</button>
            </form>
        );
    }
}

Register = reduxForm({
    form: 'Register'
})(Register);

export default Register;
