import React from 'react';
import Password from './Password';

export default class Profile extends React.Component {
    render() {
        return <Password changePassword={this.props.changePassword}/>;
    }
}
