import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Divider, Button } from 'semantic-ui-react';

import { TextInput } from '../FieldInput/FieldInputs';

const required = value => value ? undefined : 'This field must not be empty';
const matchPassword = (values, allValues) => allValues.newPassword === allValues.confirmNewPassword ? undefined : 'New password and confirm password did not match';

class PasswordChangeForm extends React.Component {
    handleSubmit(formValues) {
        console.log(formValues);
        this.props.changePassword(formValues);
    }

    render() {
        const { handleSubmit, reset, submitting } = this.props;

        return (
            <div>
                <h3>Change password</h3>
                <Divider section/>

                <Form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <Field name="currentPassword" label="Current password" attributes={{type: 'password'}} component={TextInput} validate={[ required ]}/>
                    <Field name="newPassword" label="New password" attributes={{type: 'password'}} component={TextInput} validate={[ required, matchPassword ]}/>
                    <Field name="confirmNewPassword" label="Confirm new password" attributes={{type: 'password'}} component={TextInput} validate={[ required, matchPassword]}/>
                    <Divider hidden/>
                    <Button.Group>
                        <Button type="submit" positive disabled={submitting}>Change password</Button>
                        <Button.Or/>
                        <Button type="button" disabled={submitting} onClick={reset}>Reset</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}

PasswordChangeForm = reduxForm({
    form: 'PasswordChangeForm'
})(PasswordChangeForm);

export default PasswordChangeForm;
