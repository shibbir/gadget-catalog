import React from 'react';
import PasswordChangeForm from './PasswordChangeForm';

export default class Profile extends React.Component {
    render() {
        return <PasswordChangeForm changePassword={this.props.changePassword}/>;
    }
}
